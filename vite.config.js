import { defineConfig, loadEnv } from 'vite'
import vue from '@94ai/vite-plugin-vue2'
import path from "path"
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import Components from 'unplugin-vue-components/vite'
import { NfCommonUIResolver } from '@94ai/common-ui-resolver'
import CommonUITool from '@94ai/common-ui/lib/util'
import legacy from '@vitejs/plugin-legacy'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'

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
      viteCommonjs(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
        symbolId: 'icon-[name]'
      }),
      Components(
        CommonUITool.getJsComponentSampleConfig({
          resolvers: [
            NfCommonUIResolver({
              importStyle: 'css'
            })],
          extensions: ['es6', 'vue', 'md', 'jsx', 'tsx', 'mjs', 'mts', 'js', 'ts'],
          dirs: [] // 如果你的项目不想指定多余的自动导包扫描目录指定为空即可
        })),
      legacy(),
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
