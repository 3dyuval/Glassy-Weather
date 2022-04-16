import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from '@honkhonk/vite-plugin-svgr'
import copy from 'rollup-plugin-copy'

// https://vitejs.dev/config/

const devConfig = {
  plugins: [
    react(),
    svgr()
  ]
}

const buildConfig = {
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
      targets: [{ src: 'src/assets/*', dest: 'dist/assets' }],
      // { src: 'src/assets/colors', dest: 'dist/assets' }],
      hook: 'writeBundle'
    }),
  ]
}



export default defineConfig(({ command, mode }) => {
  if (command === 'build') {
    return buildConfig
  } else {
    return devConfig
  }
})




