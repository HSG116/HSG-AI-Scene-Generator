import React, { useState, useEffect, useCallback } from 'react';
import { UploadedFile, Language, Option } from './types';
import { CAMERA_ANGLES, LIGHTING_STYLES, LENS_PERSPECTIVES, TRANSLATIONS } from './constants';
import { generateScene } from './services/geminiService';
import { LanguageIcon } from './components/IconComponents';
import SceneForm from './components/SceneForm';
import ResultsDisplay from './components/ResultsDisplay';

const Header: React.FC<{ language: Language; setLanguage: (lang: Language) => void; t: (key: string) => string; }> = ({ language, setLanguage, t }) => {
    const toggleLanguage = () => {
        const newLang = language === Language.EN ? Language.AR : Language.EN;
        setLanguage(newLang);
    };

    return (
        <header className="text-center mb-10">
            <div className="flex justify-center items-center mb-2 gap-4">
                <img src="https://i.postimg.cc/d3823YW9/1000069461.png" alt="HSG AI Logo" className="w-16 h-16 rounded-full border-2 border-emerald-500/50"/>
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
                    {t('headerTitle')}
                </h1>
                <button onClick={toggleLanguage} className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-colors" aria-label="Toggle Language">
                    <LanguageIcon />
                </button>
            </div>
            <p className="text-slate-400 text-lg">{t('headerSubtitle')}</p>
        </header>
    );
};

const App: React.FC = () => {
    const [language, setLanguage] = useState<Language>(Language.AR);
    const [isApiKeyMissing, setIsApiKeyMissing] = useState(false);

    // Form State
    const [characters, setCharacters] = useState<UploadedFile[]>([]);
    const [locationImage, setLocationImage] = useState<UploadedFile[]>([]);
    const [styleImage, setStyleImage] = useState<UploadedFile[]>([]);
    const [sceneDescription, setSceneDescription] = useState('');
    const [cameraAngle, setCameraAngle] = useState(CAMERA_ANGLES[0].value);
    const [lightingStyle, setLightingStyle] = useState(LIGHTING_STYLES[0].value);
    const [lensPerspective, setLensPerspective] = useState(LENS_PERSPECTIVES[0].value);
    const [combinedPrompt, setCombinedPrompt] = useState('');

    // Results State
    const [generatedImages, setGeneratedImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const t = useCallback((key: string): string => {
        return TRANSLATIONS[key]?.[language] || key;
    }, [language]);
    
    useEffect(() => {
      if (!process.env.API_KEY) {
          setIsApiKeyMissing(true);
      }
    }, []);

    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.dir = language === Language.AR ? 'rtl' : 'ltr';
        document.body.className = `bg-slate-900 text-slate-200 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800/40 to-slate-900 ${language === Language.AR ? 'font-arabic' : 'font-sans'}`;
    }, [language]);
    
    const getLabel = useCallback((options: Option[], value: string) => {
        return options.find(opt => opt.value === value)?.label[language] || value;
    }, [language]);

    useEffect(() => {
        const buildPrompt = () => {
            let prompt = `Generate a cinematic, high-resolution image.\n\n`;
            prompt += `**SCENE:** ${sceneDescription || 'Not specified'}.\n`;
            
            if (characters.length > 0) {
                const charNames = characters.map(c => `'${c.name}'`).join(', ');
                prompt += `**CHARACTERS:** Featuring ${charNames}. Their appearance is defined by the attached reference images.\n`;
            }
            if (locationImage.length > 0) {
                prompt += `**LOCATION:** Use the attached '${locationImage[0].name}' image as the primary reference for the setting.\n`;
            }
            if (styleImage.length > 0) {
                prompt += `**AESTHETIC:** Emulate the visual style of the attached '${styleImage[0].name}' image.\n`;
            }

            prompt += `**CAMERA:** ${getLabel(CAMERA_ANGLES, cameraAngle)} shot with a ${getLabel(LENS_PERSPECTIVES, lensPerspective)} perspective.\n`;
            prompt += `**LIGHTING:** The scene is lit with ${getLabel(LIGHTING_STYLES, lightingStyle)} lighting.`;

            return prompt;
        };
        setCombinedPrompt(buildPrompt());
    }, [characters, locationImage, styleImage, sceneDescription, cameraAngle, lightingStyle, lensPerspective, language, getLabel]);

    const handleGenerateScene = async () => {
        setIsLoading(true);
        setError(null);
        setGeneratedImages([]);

        const allImages = [...characters, ...locationImage, ...styleImage];
        try {
            const result = await generateScene(combinedPrompt, allImages);
            setGeneratedImages(result);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(errorMessage.replace('Failed to generate scene:', '').trim());
        } finally {
            setIsLoading(false);
        }
    };
    
    const isGenerateDisabled = isApiKeyMissing || characters.length === 0 || !sceneDescription.trim() || isLoading;
    
    const formProps = {
        language, t, getLabel, characters, setCharacters, locationImage,
        setLocationImage, styleImage, setStyleImage, sceneDescription,
        setSceneDescription, cameraAngle, setCameraAngle, lightingStyle,
        setLightingStyle, lensPerspective, setLensPerspective, combinedPrompt,
        isGenerateDisabled, isLoading, handleGenerateScene, isApiKeyMissing,
    };
    const resultsProps = { isLoading, error, generatedImages, t };

    return (
        <div dir={language === Language.AR ? 'rtl' : 'ltr'} className={`min-h-screen ${language === Language.AR ? 'font-arabic' : 'font-sans'} transition-all duration-300`}>
            <main className="container mx-auto p-4 md:p-8">
                <Header language={language} setLanguage={setLanguage} t={t} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <SceneForm {...formProps} />
                    <ResultsDisplay {...resultsProps} />
                </div>
            </main>
        </div>
    );
};

export default App;