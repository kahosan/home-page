import { defineConfig, presetIcons, presetUno } from 'unocss';
import servicesJSON from './services.json';

function generatorIconList() {
  return servicesJSON.map(service => `i-carbon-${service.icon}`);
}

export default defineConfig({
  rules: [
    ['blurBackground', { 'backdrop-filter': 'blur(10px)' }]
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
