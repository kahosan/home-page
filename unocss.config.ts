import { defineConfig, presetIcons, presetUno } from 'unocss';
import icons from '@iconify-json/carbon/icons.json';

function generatorIconList() {
  return Object.keys(icons.icons).map(icon => `i-carbon-${icon}`);
}

export default defineConfig({
  rules: [
    ['blur-bg', { 'backdrop-filter': 'blur(12px)' }],
    ['i-link', {
      padding: '2px 0',
      margin: 'auto 4px',
      cursor: 'pointer',
      transition: 'all .3s ease',
      'box-shadow': '0 -2px #ff4b4498 inset'
    }],
    ['i-link-hover', { 'box-shadow': '0 -8.8px #ff4b4498 inset' }],
    ['icon-tap-color', { '-webkit-tap-highlight-color': 'transparent' }],
    ['input-border-focus-animation', { transition: 'border 0.2s ease 0s, color 0.2s ease 0s;' }]
  ],
  shortcuts: [
    ['link', 'i-link hover:i-link-hover'],
    [/^opacity-animation-(\d+)$/, ([, d]) => `transition-opacity-${Number(d) * 100} hover:opacity-50 hover:transition-opacity-${Number(d) * 100}`],
    ['input-group-border-left', 'border rd-1.5 rd-br-0 rd-tr-0 dark:border-#333 border-#eaeaea'],
    ['input-group-border-right', 'border rd-1.5 rd-bl-0 rd-tl-0 dark:border-#333 border-#eaeaea focus:dark:border-#888 focus:border-#666 input-border-focus-animation']
  ],
  theme: {
    colors: {
      boxBackground: '#E9EAE9',
      darkBoxBackground: '#131313'
    }
  },
  presets: [
    presetUno(),
    presetIcons({
      collections: {
        carbon: () => icons
      }
    })
  ],
  safelist: [...generatorIconList()]
});
