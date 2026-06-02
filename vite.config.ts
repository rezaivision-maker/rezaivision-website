import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'inline-css',
        apply: 'build',
        enforce: 'post',
        generateBundle(options, bundle) {
          const htmlFile = bundle['index.html'];
          if (htmlFile && htmlFile.type === 'asset') {
            let html = htmlFile.source.toString();
            for (const [key, value] of Object.entries(bundle)) {
              if (key.endsWith('.css') && value.type === 'asset') {
                const cssContent = value.source.toString();
                const regex = new RegExp(`<link[^>]*href=["'](?:\\.?/)?${value.fileName}["'][^>]*>`, 'g');
                if (regex.test(html)) {
                  html = html.replace(regex, `<style>${cssContent}</style>`);
                  delete bundle[key];
                }
              }
            }
            htmlFile.source = html;
          }
        }
      }
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-motion': ['motion/react'],
            'vendor-helmet': ['react-helmet-async'],
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
