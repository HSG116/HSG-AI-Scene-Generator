import React from 'react';
import { UploadedFile, Language, Option } from '../types';
import { CAMERA_ANGLES, LIGHTING_STYLES, LENS_PERSPECTIVES } from '../constants';
import ImageUploader from './ImageUploader';
import SelectInput from './SelectInput';

interface SceneFormProps {
    language: Language;
    t: (key: string) => string;
    
    characters: UploadedFile[];
    setCharacters: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
    locationImage: UploadedFile[];
    setLocationImage: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
    styleImage: UploadedFile[];
    setStyleImage: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
    
    sceneDescription: string;
    setSceneDescription: React.Dispatch<React.SetStateAction<string>>;
    
    cameraAngle: string;
    setCameraAngle: React.Dispatch<React.SetStateAction<string>>;
    lightingStyle: string;
    setLightingStyle: React.Dispatch<React.SetStateAction<string>>;
    lensPerspective: string;
    setLensPerspective: React.Dispatch<React.SetStateAction<string>>;

    combinedPrompt: string;
    isGenerateDisabled: boolean;
    isLoading: boolean;
    handleGenerateScene: () => void;
}

const FormSection: React.FC<{ title: string; children: React.ReactNode; step: number; }> = ({ title, children, step }) => (
    <div className="border-t border-slate-700 pt-6 space-y-4">
        <h3 className="text-lg font-semibold text-emerald-300 flex items-center gap-3">
            <span className="bg-emerald-500/20 text-emerald-300 rounded-full w-8 h-8 flex-shrink-0 inline-flex items-center justify-center font-sans">{step}</span>
            {title}
        </h3>
        {children}
    </div>
);


const SceneForm: React.FC<SceneFormProps> = (props) => {
    const {
        t, characters, setCharacters, locationImage,
        setLocationImage, styleImage, setStyleImage, sceneDescription,
        setSceneDescription, cameraAngle, setCameraAngle, lightingStyle,
        setLightingStyle, lensPerspective, setLensPerspective, combinedPrompt,
        isGenerateDisabled, isLoading, handleGenerateScene, language
    } = props;

    const handleFileNameChange = (setter: React.Dispatch<React.SetStateAction<UploadedFile[]>>) => (id: string, newName: string) => {
        setter(prev => prev.map(file => file.id === id ? { ...file, name: newName } : file));
    };

    return (
        <div className="space-y-6 bg-slate-800/60 backdrop-blur-sm p-6 rounded-xl border border-slate-700">
            <FormSection title={t('uploadCharacters')} step={1}>
                <ImageUploader
                    id="character-upload"
                    files={characters}
                    onFilesChange={setCharacters}
                    onFileNameChange={handleFileNameChange(setCharacters)}
                    multiple
                    nameInputPlaceholder={t('characterName')}
                    buttonText={t('selectFiles')}
                />
            </FormSection>

            <FormSection title={t('describeScene')} step={2}>
                 <textarea
                    value={sceneDescription}
                    onChange={(e) => setSceneDescription(e.target.value)}
                    placeholder={t('sceneDescriptionPlaceholder')}
                    rows={4}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                />
            </FormSection>

            <FormSection title={t('uploadRefImages')} step={3}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ImageUploader
                        id="location-upload"
                        label={t('uploadLocation')}
                        files={locationImage}
                        onFilesChange={setLocationImage}
                        onFileNameChange={handleFileNameChange(setLocationImage)}
                        nameInputPlaceholder={t('locationName')}
                        buttonText={t('selectFile')}
                    />
                    <ImageUploader
                        id="style-upload"
                        label={t('uploadStyle')}
                        files={styleImage}
                        onFilesChange={setStyleImage}
                        onFileNameChange={handleFileNameChange(setStyleImage)}
                        nameInputPlaceholder={t('styleName')}
                        buttonText={t('selectFile')}
                    />
                </div>
            </FormSection>

            <FormSection title={t('technicalDetails')} step={4}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <SelectInput label={t('selectCamera')} value={cameraAngle} onChange={(e) => setCameraAngle(e.target.value)} options={CAMERA_ANGLES} language={language} />
                    <SelectInput label={t('selectLighting')} value={lightingStyle} onChange={(e) => setLightingStyle(e.target.value)} options={LIGHTING_STYLES} language={language} />
                </div>
                <SelectInput label={t('selectLens')} value={lensPerspective} onChange={(e) => setLensPerspective(e.target.value)} options={LENS_PERSPECTIVES} language={language} />
            </FormSection>
            
            <FormSection title={t('combinedPrompt')} step={5}>
               <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 text-slate-400 whitespace-pre-wrap text-sm font-mono selection:bg-emerald-500/20">
                    {combinedPrompt}
               </div>
            </FormSection>

            <div className="pt-6 border-t border-slate-700">
                <button
                    onClick={handleGenerateScene}
                    disabled={isGenerateDisabled}
                    className={`w-full text-lg font-bold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center
                        ${isGenerateDisabled
                            ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-emerald-500 to-cyan-600 text-white hover:opacity-90 transform hover:scale-[1.02] shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40'
                        }`}
                    title={
                        characters.length === 0 ? t('uploadCharacterTooltip') : 
                        !sceneDescription.trim() ? t('describeSceneTooltip') : ''
                    }
                    aria-label={t('generateScene')}
                >
                    {isLoading ? t('generating') : t('generateScene')}
                </button>
            </div>
        </div>
    );
};

export default SceneForm;
