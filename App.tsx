import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { UploadedFile, Language, Option } from './types';
import { CAMERA_ANGLES, LIGHTING_STYLES, LENS_PERSPECTIVES, TRANSLATIONS, IMAGE_COUNT_OPTIONS } from './constants';
import { generateScene } from './services/geminiService';
import ImageUploader from './components/ImageUploader';
import SelectInput from './components/SelectInput';
import { LanguageIcon } from './components/IconComponents';
import ApiConfigWarning from './components/ApiConfigWarning';

const Header: React.FC<{ language: Language; setLanguage: (lang: Language) => void; t: (key: string) => string; }> = ({ language, setLanguage, t }) => {
    const toggleLanguage = () => {
        const newLang = language === Language.EN ? Language.AR : Language.EN;
        setLanguage(newLang);
    };

    return (
        <header className="text-center mb-10">
            <div className="flex justify-center items-center mb-2">
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
                    {t('headerTitle')}
                </h1>
                <button onClick={toggleLanguage} className="ms-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
                    <LanguageIcon />
                </button>
            </div>
            <p className="text-slate-400">{t('headerSubtitle')}</p>
        </header>
    );
};

const Loader: React.FC<{ message: string }> = ({ message }) => (
    <div className="flex flex-col items-center justify-center text-center p-8">
        <svg className="animate-spin h-12 w-12 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="http://www.w3.org/2000/svg">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-lg font-semibold text-slate-300">{message}</p>
    </div>
);

const App: React.FC = () => {
    const [language, setLanguage] = useState<Language>(Language.AR);
    const [isApiKeyMissing, setIsApiKeyMissing] = useState(false);

    const [characters, setCharacters] = useState<UploadedFile[]>([]);
    const [locationImage, setLocationImage] = useState<UploadedFile[]>([]);
    const [styleImage, setStyleImage] = useState<UploadedFile[]>([]);
    const [sceneDescription, setSceneDescription] = useState('');
    const [cameraAngle, setCameraAngle] = useState(CAMERA_ANGLES[0].value);
    const [lightingStyle, setLightingStyle] = useState(LIGHTING_STYLES[0].value);
    const [lensPerspective, setLensPerspective] = useState(LENS_PERSPECTIVES[0].value);
    const [imageCount, setImageCount] = useState(1);
    const [combinedPrompt, setCombinedPrompt] = useState('');

    const [generatedImages, setGeneratedImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const t = useCallback((key: string): string => {
        return TRANSLATIONS[key]?.[language] || key;
    }, [language]);
    
    useEffect(() => {
      // In a typical build setup, an unconfigured environment variable might be undefined.
      // This check displays the warning if the API key seems to be missing.
      if (!process.env.API_KEY) {
          setIsApiKeyMissing(true);
      }
    }, []);

    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.dir = language === Language.AR ? 'rtl' : 'ltr';
        document.body.className = `bg-slate-900 text-slate-200 ${language === Language.AR ? 'font-arabic' : 'font-sans'}`;
    }, [language]);
    
    const getLabel = useCallback((options: Option[], value: string) => {
        return options.find(opt => opt.value === value)?.label[language] || value;
    }, [language]);

    useEffect(() => {
        const buildPrompt = () => {
            let prompt = `Generate a cinematic, high-resolution image based on the following specifications.\n`;
            prompt += `**SCENE:** ${sceneDescription || 'Not specified'}\n`;
            
            if (characters.length > 0) {
                prompt += `**CHARACTERS:**\n${characters.map(c => `- ${c.name}: See attached character reference.`).join('\n')}\n`;
            }
            if (locationImage.length > 0) {
                prompt += `**LOCATION:** Use the attached '${locationImage[0].name}' image as a reference.\n`;
            }
            if (styleImage.length > 0) {
                prompt += `**STYLE:** Emulate the cinematic look from the attached '${styleImage[0].name}' style reference.\n`;
            }

            prompt += `**CAMERA & LENS:** ${getLabel(CAMERA_ANGLES, cameraAngle)}, using a ${getLabel(LENS_PERSPECTIVES, lensPerspective)} perspective.\n`;
            prompt += `**LIGHTING:** ${getLabel(LIGHTING_STYLES, lightingStyle)}.`;

            return prompt;
        };
        setCombinedPrompt(buildPrompt());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [characters, locationImage, styleImage, sceneDescription, cameraAngle, lightingStyle, lensPerspective, language, getLabel]);

    const handleFileNameChange = (setter: React.Dispatch<React.SetStateAction<UploadedFile[]>>) => (id: string, newName: string) => {
        setter(prev => prev.map(file => file.id === id ? { ...file, name: newName } : file));
    };

    const handleGenerateScene = async () => {
        setIsLoading(true);
        setError(null);
        setGeneratedImages([]);

        const allImages = [...characters, ...locationImage, ...styleImage];
