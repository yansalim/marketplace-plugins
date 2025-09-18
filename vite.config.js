import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Infer the project name from the GitHub repo so Pages serves assets from the right base path
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const repoBase = process.env.GITHUB_ACTIONS && repoName ? `/${repoName}/` : '/';

export default defineConfig({
  base: repoBase,
  plugins: [react()],
});
