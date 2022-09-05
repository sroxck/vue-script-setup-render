import { defineConfig } from 'vite'
import VueMacros from 'unplugin-vue-macros/vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import {
  createStyleImportPlugin,
  ElementPlusResolve,
} from 'vite-plugin-style-import'

export default defineConfig({
  plugins: [
    AutoImport({
      imports: ['vue'],
      dts: "./auto-import.d.ts",
      include: [
        /.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /.vue$/, /.vue?vue/, // .vue
        /.md$/, // .md
      ],
      eslintrc: {
        enabled: false, // Default `false`
        filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | "readonly" | "readable" | "writable" | "writeable")
      },
    }),
    VueMacros({
      plugins: {
        vue: Vue(),
        vueJsx: VueJsx(), // 如有需要
      },
    }),
    Components({
      // 指定组件位置，默认是src/components
      dirs: ['src/components'],
      // ui库解析器
      // resolvers: [ElementPlusResolver()],
      extensions: ['vue', 'ts', 'js'],
      // 配置文件生成位置
      dts: 'src/components.d.ts',
      // ui库解析器，也可以自定义
      resolvers: [
        ElementPlusResolver(),
      ]
    }),
    createStyleImportPlugin({
      resolves:[
        ElementPlusResolve(),
        ],
      // libs: [
      //   // 如果没有你需要的resolve，可以在lib内直接写，也可以给我们提供PR
      //   {
      //     libraryName: 'ant-design-vue',
      //     esModule: true,
      //     resolveStyle: (name) => {
      //       return `ant-design-vue/es/${name}/style/index`
      //     },
      //   },
      // ],
    }),
  ]
})
