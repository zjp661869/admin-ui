import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue2'
import path from "path"
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 'mode' 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 'VITE_' 前缀。
  const env = loadEnv(mode, process.cwd(), '')
  return {
    fs: {
      strict: false,
      allow: ['..']
    },
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
        // 指定 symbolId 格式
        symbolId: 'icon-[name]'
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    server: {
      hmr: {
        overlay: false
      },
      https: false,
      port: 666,
      host: "0.0.0.0",
      proxy: {
        // "/api": {
        //   target: 'http://corpus.test.k8s.com:31962/api',
        //   changeOrigin: true,
        //   rewrite: path => path.replace("/api", "")
        // }
      }
    },
    define: {
      "process.env": env
    },
    build: {
      sourcemap: false,
    },
  }
})
