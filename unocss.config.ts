import { defineConfig, presetIcons, presetUno } from 'unocss';
import servicesJSON from './services.json';

function generatorIconList() {
  return servicesJSON.map(service => `i-carbon-${service.icon}`);
}

export default defineConfig({
  rules: [
    ['blurBackground', { 'backdrop-filter': 'blur(12px)' }],
    ['ilink', {
      padding: '2px 0',
      margin: 'auto 4px',
      cursor: 'pointer',
      transition: 'all .3s ease',
      'box-shadow': '0 -2px #ff4b4498 inset'
    }],
    ['ilinkhover', { 'box-shadow': '0 -8.8px #ff4b4498 inset' }]
  ],
  shortcuts: [
    ['link', 'ilink hover:ilinkhover'],
    [/^opacity-animation-(\d+)$/, ([, d]) => `transition-opacity-${Number(d) * 100} hover:opacity-50 hover:transition-opacity-${Number(d) * 100}`]
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
        carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default)
      }
    })
  ],
  safelist: [...generatorIconList()]
});
