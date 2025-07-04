/**
 * Build script for GitHub Pages deployment
 */
import { build } from 'esbuild';
import { stylePlugin } from 'esbuild-style-plugin';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const isDev = process.argv.includes('--dev');
const isProduction = process.argv.includes('--production');

async function buildApp() {
  try {
    // Create dist directory if it doesn't exist
    if (!existsSync('dist')) {
      mkdirSync('dist', { recursive: true });
    }

    console.log('🚀 Building Teacher Attendance System...');

    // Build the React app
    await build({
      entryPoints: ['src/main.tsx'],
      bundle: true,
      outfile: 'dist/main.js',
      format: 'esm',
      platform: 'browser',
      target: ['es2020'],
      minify: isProduction,
      sourcemap: isDev,
      define: {
        'process.env.NODE_ENV': isProduction ? '"production"' : '"development"',
      },
      plugins: [
        stylePlugin({
          postcss: {
            plugins: [
              require('tailwindcss'),
              require('autoprefixer'),
            ],
          },
        }),
      ],
      loader: {
        '.tsx': 'tsx',
        '.ts': 'ts',
        '.jsx': 'jsx',
        '.js': 'js',
        '.css': 'css',
      },
      jsx: 'automatic',
      jsxImportSource: 'react',
      external: [],
    });

    // Copy CSS file to dist
    const cssContent = readFileSync('src/shadcn.css', 'utf-8');
    writeFileSync('dist/styles.css', cssContent);

    console.log('✅ Build completed successfully!');
    console.log('📁 Files created:');
    console.log('   - dist/main.js');
    console.log('   - dist/styles.css');

    if (isDev) {
      console.log('🔄 Watching for changes...');
      // In a real setup, you'd add file watching here
    }

  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

buildApp();
