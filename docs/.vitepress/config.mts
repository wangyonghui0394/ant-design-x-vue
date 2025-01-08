import { defineConfig } from 'vitepress'
import VueMacros from 'unplugin-vue-macros/vite'
import path from 'node:path';
import { fileURLToPath, URL } from 'node:url'
import { mdPlugin } from './config/plugins'
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { MarkdownTransform } from './plugins/markdown-transform';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    resolve: {
      alias: [
        {
          find: /^ant-design-x-vue$/,
          replacement: path.resolve(__dirname, '../../src')
        },
        {
          find: /^dayjs\/plugin\/quarterOfYear$/,
          replacement: 'dayjs/esm/plugin/quarterOfYear'
        },
        {
          find: /^dayjs\/plugin\/weekYear$/,
          replacement: 'dayjs/esm/plugin/weekYear'
        },
        {
          find: /^dayjs\/plugin\/weekOfYear$/,
          replacement: 'dayjs/esm/plugin/weekOfYear'
        },
        {
          find: /^dayjs\/plugin\/localeData$/,
          replacement: 'dayjs/esm/plugin/localeData'
        },
        {
          find: /^dayjs\/plugin\/weekday$/,
          replacement: 'dayjs/esm/plugin/weekday'
        },
        {
          find: /^dayjs\/plugin\/advancedFormat$/,
          replacement: 'dayjs/esm/plugin/advancedFormat'
        },
        {
          find: /^dayjs\/plugin\/customParseFormat$/,
          replacement: 'dayjs/esm/plugin/customParseFormat'
        },
        {
          find: /^dayjs$/,
          replacement: 'dayjs/esm'
        },
        {
          find: /^.*\/VPHero\.vue$/,
          replacement: fileURLToPath(
            new URL('./vitepress/components/vp-hero.vue', import.meta.url)
          )
        }
      ]
    },
    ssr: {
      noExternal: ['ant-design-vue', '@ant-design/icons-vue'], // 避免打包为 CommonJS
    },
    build: {
      rollupOptions: {
        output: {
          globals: {
            'ant-design-vue': 'AntDesignVue',
          },
        },
      },
    },
    plugins: [
      VueMacros({
        plugins: {
          vueJsx: vueJsx(),
        },
        // 覆盖插件选项
      }),
      MarkdownTransform(),
    ],
  },
  markdown: {
    config: (md) => mdPlugin(md),
  },
  title: "Ant Design X Vue",
  description: "Ant Design X For Vue",
  appearance: 'force-dark',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: 'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*eco6RrQhxbMAAAAAAAAAAAAADgCCAQ/original',
    nav: [
      { text: '组件', link: '/component/overview' }
    ],

    sidebar: [
      {
        text: '总览',
        link: '/component/overview'
      },
      {
        text: '通用',
        items: [
          { text: 'Bubble 对话气泡框', link: '/component/bubble' },
          { text: 'Conversations 管理对话', link: '/component/conversations' }
        ]
      },
      {
        text: '唤醒',
        items: [
          { text: 'Welcome 欢迎', link: '/component/welcome' },
          { text: 'Prompts 提示集', link: '/component/prompts' }
        ]
      },
      {
        text: '表达',
        items: [
          { text: 'Attachment 输入附件', link: '/component/attachment' },
          { text: 'Suggestion 快捷指令', link: '/component/suggestion' }
        ]
      },
      {
        text: '确认',
        items: [
          { text: 'ThoughtChain 思维链', link: '/component/thought-chain' }
        ]
      },
      {
        text: '工具',
        items: [
          { text: 'XStream 流', link: '/component/x-stream' }
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/wzc520pyfm/ant-design-x-vue' }
    ]
  }
})
