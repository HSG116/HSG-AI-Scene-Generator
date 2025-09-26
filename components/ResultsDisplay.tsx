import React from 'react';
import { DownloadIcon, FilmIcon } from './IconComponents';

interface ResultsDisplayProps {
  isLoading: boolean;
  error: string | null;
  generatedImages: string[];
  t: (key: string) => string;
}

const Loader: React.FC<{ message: string }> = ({ message }) => (
    <div className="flex flex-col items-center justify-center text-center p-8 animate-fade-in">
        <svg className="animate-spin h-12 w-12 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-lg font-semibold text-slate-300">{message}</p>
    </div>
);

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
    <div className="flex flex-col items-center justify-center text-center text-slate-500 animate-fade-in">
        <FilmIcon className="w-24 h-24 mb-4" />
        <p className="text-xl">{message}</p>
    </div>
);

const GeneratedImage: React.FC<{ src: string; index: number }> = ({ src, index }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = `hsg-ai-scene-${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative group animate-fade-in">
        <img src={src} alt={`Generated scene ${index + 1}`} className="w-full object-contain rounded-lg shadow-lg transition-all" />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
            <button
                onClick={handleDownload}
                className="flex items-center gap-2 text-white bg-emerald-600/80 backdrop-blur-sm hover:bg-emerald-500 font-bold py-2 px-4 rounded-lg transition-all transform hover:scale-105"
                aria-label="Download image"
            >
                <DownloadIcon className="w-5 h-5" />
                Download
            </button>
        </div>
    </div>
  );
};

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ isLoading, error, generatedImages, t }) => {
    return (
        <div className="space-y-6 bg-slate-800/60 backdrop-blur-sm p-6 rounded-xl border border-slate-700 h-full min-h-[50vh] flex flex-col lg:sticky top-8">
            <h2 className="text-2xl font-bold text-emerald-300 flex-shrink-0">{t('results')}</h2>
            <div className="flex-grow flex items-center justify-center rounded-lg bg-slate-900/50 p-4 min-h-[40vh]">
                 {isLoading && <Loader message={t('generating')} />}
                 {error && (
                    <div className="text-center text-red-400 bg-red-900/50 border border-red-700 p-4 rounded-lg animate-fade-in">
                        <p className="font-bold text-lg">{t('errorOccurred')}</p>
                        <p className="mt-2 text-sm max-w-md">{error}</p>
                    </div>
                 )}
                {!isLoading && !error && generatedImages.length === 0 && (
                    <EmptyState message={t('yourVisionAwaits')} />
                )}
                {generatedImages.length > 0 && (
                    <div className="grid grid-cols-1 gap-6 w-full max-h-[75vh] overflow-y-auto p-2">
                        {generatedImages.map((src, index) => (
                           <GeneratedImage key={index} src={src} index={index} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResultsDisplay;
