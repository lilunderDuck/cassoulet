import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import Pages from 'vite-plugin-pages';
import { stylex } from 'vite-plugin-stylex-dev';
import Macros from 'unplugin-macros/vite'

export default defineConfig({
  plugins: [
    Pages({
      dirs: ['frontend/pages'],
    }),
    solidPlugin(),
    stylex(),
    Macros()
  ],
  server: {
    port: 3000,
    watch: {
      // make sure any wails stuff excluded from the watch list
      // so vite doesn't crash randomly on dev mode.
      ignored: ["**/*.syso", "**/out/*"]
    }
  },
  build: {
    target: 'esnext',
    outDir: "./build/bin/apps/cassoulet"
  },
});
