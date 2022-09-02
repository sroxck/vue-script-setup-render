import { defineConfig } from 'vite'
import VueMacros from 'unplugin-vue-macros/vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
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
      extensions: ['vue','ts','js'],
      // 配置文件生成位置
      dts: 'src/components.d.ts'
    }),
   
  ]
})
