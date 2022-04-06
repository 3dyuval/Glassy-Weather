import { defineConfig } from 'vite'
import svgr from '@honkhonk/vite-plugin-svgr'
import react from '@vitejs/plugin-react'
import { viteExternalsPlugin as externals } from 'vite-plugin-externals';

export default defineConfig({
  ...,
  esbuild: {
    jsxFactory: "React.createElemennt",
    jsxFragment: "React.Fragment"
  },
  plugins: [
    react({
      jsxRuntime: "classic"
    }),
    svgr(),
    externals({
      react: 'window.React',
      'react-dom': 'window.ReactDOM'
    }, { useWindow: false })
  ]
})