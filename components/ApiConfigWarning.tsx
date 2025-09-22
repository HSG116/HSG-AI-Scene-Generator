import React from 'react';

interface ApiConfigWarningProps {
  t: (key: string) => string;
}

const ApiConfigWarning: React.FC<ApiConfigWarningProps> = ({ t }) => {
  return (
    <div className="bg-amber-900/40 border border-amber-700 text-slate-200 px-6 py-5 rounded-lg relative mb-8 animate-fade-in" role="alert">
      <h4 className="font-bold text-xl mb-3 text-amber-300">{t('apiKeySetupIncompleteTitle')}</h4>
      <p className="mb-2">{t('apiKeySetupP1')}</p>
      <p className="mb-4">{t('apiKeySetupP2')}</p>
      
      <div className="bg-slate-800/50 p-4 rounded-md border border-slate-700">
        <h5 className="font-bold text-lg mb-3 text-amber-300">{t('apiKeySetupActionTitle')}</h5>
        <ol className="list-decimal list-inside space-y-3 text-slate-300 mb-4">
            <li dangerouslySetInnerHTML={{ __html: t('apiKeySetupActionStep1') }} />
            <li dangerouslySetInnerHTML={{ __html: t('apiKeySetupActionStep2') }} />
            <li>{t('apiKeySetupActionStep3')}</li>
        </ol>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900 rounded-md p-4 my-2 text-sm font-mono">
            <div>
                <label className="block text-slate-400 text-xs mb-1">{t('envVarName')}</label>
                <div className="bg-slate-700 text-cyan-300 rounded p-2">API_KEY</div>
            </div>
            <div>
                <label className="block text-slate-400 text-xs mb-1">{t('envVarValue')}</label>
                <div className="bg-slate-700 text-slate-500 rounded p-2">{t('envVarValuePlaceholder')}</div>
            </div>
        </div>

        <ol start={4} className="list-decimal list-inside space-y-3 text-slate-300 mt-4">
          <li dangerouslySetInnerHTML={{ __html: t('apiKeySetupActionStep4') }} />
        </ol>
        
        <p className="mt-4 text-sm text-slate-400">{t('apiKeySetupActionNote')}</p>
      </div>
    </div>
  );
};

export default ApiConfigWarning;
