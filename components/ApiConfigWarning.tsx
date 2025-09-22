import React from 'react';

interface ApiConfigWarningProps {
  t: (key: string) => string;
}

const CodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <pre className="bg-slate-900 rounded-md p-4 mt-2 text-sm text-cyan-300 font-mono whitespace-pre-wrap overflow-x-auto">
    <code>{children}</code>
  </pre>
);

const ApiConfigWarning: React.FC<ApiConfigWarningProps> = ({ t }) => {
  const fullYamlSnippet = `# Workflow for deploying a static React/Vite site to GitHub Pages
name: Deploy static content to Pages

on:
  push:
    branches: ["main"] # Trigger deployment on pushes to the main branch
  workflow_dispatch: # Allow manual deployment from the Actions tab

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - name: Install dependencies
        run: npm install
      - name: Build application
        # THIS IS THE CRUCIAL STEP: It passes your API_KEY secret 
        # from GitHub Settings into the build process.
        env:
          API_KEY: \${{ secrets.API_KEY }}
        run: npm run build
      - name: Setup GitHub Pages
        uses: actions/configure-pages@v5
      - name: Upload build artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist' # Assumes your build output is in the 'dist' folder
  
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`;

  return (
    <div className="bg-amber-900/40 border border-amber-700 text-slate-200 px-6 py-5 rounded-lg relative mb-8 animate-fade-in" role="alert">
      <h4 className="font-bold text-xl mb-3 text-amber-300">{t('apiKeySetupIncompleteTitle')}</h4>
      <p className="mb-2">{t('apiKeySetupP1')}</p>
      <p className="mb-4">{t('apiKeySetupP2')}</p>
      
      <div className="bg-slate-800/50 p-4 rounded-md border border-slate-700">
        <h5 className="font-bold text-lg mb-3 text-amber-300">{t('apiKeySetupActionTitle')}</h5>
        <ol className="list-decimal list-inside space-y-3 text-slate-300">
            <li>{t('apiKeySetupActionStep1')}</li>
            <li>{t('apiKeySetupActionStep2')}</li>
            <li>{t('apiKeySetupActionStep3')}</li>
        </ol>
        <CodeBlock>{fullYamlSnippet.trim()}</CodeBlock>
        <p className="mt-4 text-sm text-slate-400">{t('apiKeySetupActionNote')}</p>
      </div>
    </div>
  );
};

export default ApiConfigWarning;