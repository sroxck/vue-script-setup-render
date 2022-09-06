import { defineConfig } from 'vite'
import VueMacros from 'unplugin-vue-macros/vite' // vue macros
import Vue from '@vitejs/plugin-vue' 
import VueJsx from '@vitejs/plugin-vue-jsx'  // jsx plugin
import Components from 'unplugin-vue-components/vite' // auto import components
import AutoImport from 'unplugin-auto-import/vite' // auto import vue hooks
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers' // auto import elementUI
import Pages from 'vite-plugin-pages' // auto generate routes by dirs
import { createStyleImportPlugin, ElementPlusResolve, } from 'vite-plugin-style-import' // import styles
import Markdown from 'vite-plugin-md' // use markdown components
export default defineConfig({
  plugins: [
    Pages({
      dirs: 'src/components',
      extensions: ['vue', 'ts', 'js', 'md'],
        extendRoute(route, parent) {
          if (route.path === '/') {
            // Index is unauthenticated.
            route.redirect = '/script-render'
            return route
          }
  
          // Augment the route with meta that indicates that the route requires authentication.
          return {
            ...route,
          }
        },
    }),
    AutoImport({
      imports: ['vue', 'vue-router'],
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
        vue: Vue({
          include: [/\.vue$/, /\.md$/], // <--
        }),
        vueJsx: VueJsx(), // 如有需要
      },
    }),
    Components({
      // 指定组件位置，默认是src/components
      dirs: ['src/components'],
      // ui库解析器
      // resolvers: [ElementPlusResolver()],

      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      extensions: ['vue', 'ts', 'js', 'md'],
      // 配置文件生成位置
      dts: 'src/components.d.ts',
      // ui库解析器，也可以自定义
      resolvers: [
        ElementPlusResolver(),
      ]
    }),
    // Vue({
    //   include: [/\.vue$/, /\.md$/], // <--
    // }),
    Markdown(),
    createStyleImportPlugin({
      resolves: [
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
