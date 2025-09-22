import React from 'react';

interface ApiConfigWarningProps {
  t: (key: string) => string;
}

const CodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <pre className="bg-slate-900 rounded-md p-4 mt-2 text-sm text-cyan-300 font-mono whitespace-pre-wrap">
    <code>{children}</code>
  </pre>
);

const ApiConfigWarning: React.FC<ApiConfigWarningProps> = ({ t }) => {
  const yamlSnippet = `
steps:
- uses: actions/checkout@v3
- name: Build and Deploy
  # ... other settings
  env:
    API_KEY: \${{ secrets.API_KEY }} # <-- Add this line
  run: |
    npm install
    npm run build
  `;

  return (
    <div className="bg-red-900/50 border border-red-700 text-slate-200 px-6 py-5 rounded-lg relative mb-8 animate-fade-in" role="alert">
      <h4 className="font-bold text-xl mb-3 text-red-300">{t('apiKeyInstructionsTitle')}</h4>
      <p className="mb-4">{t('apiKeyInstructionsP1')}</p>
      <p className="font-semibold mb-2">{t('apiKeyInstructionsP2_github')}</p>
      <div className="space-y-4">
        <div>
          <strong className="text-red-300">{t('apiKeyInstructionsStep1')}</strong>
          <p className="text-sm text-slate-300">{t('apiKeyInstructionsStep1_detail')}</p>
        </div>
        <div>
          <strong className="text-red-300">{t('apiKeyInstructionsStep2')}</strong>
          <p className="text-sm text-slate-300">{t('apiKeyInstructionsStep2_detail')}</p>
          <CodeBlock>{yamlSnippet.trim()}</CodeBlock>
        </div>
      </div>
    </div>
  );
};

export default ApiConfigWarning;
