import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Миксины и SCSS-константы доступны в каждом <style lang="scss"> без @use
        additionalData: '@use "@/styles/mixins" as *;\n',
      },
    },
  },
  server: {
    port: 4300,
  },
})
