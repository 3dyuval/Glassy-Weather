import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from '@honkhonk/vite-plugin-svgr'
import copy from 'rollup-plugin-copy'

// https://vitejs.dev/config/

export default defineConfig(({ command, mode }) => {
  if (command === 'build') {
    return {
      plugins: [
        react({
          babel: {
            plugins: [
              ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
            ]
          }
        }),
        svgr(),
        copy({
          targets: [{ src: 'src/assets/WeatherConditions', dest: 'dist/assets' },
          { src: 'src/assets/colors', dest: 'dist/assets' },
          { src: 'src/assets/data', dest: 'dist/assets' }],
          hook: 'writeBundle'
        }),
      ]
    }

  } else {
    return {
      server: {
        port: 3001
      },
      plugins: [
        react(),
        svgr()
      ]
    }
  }
})




