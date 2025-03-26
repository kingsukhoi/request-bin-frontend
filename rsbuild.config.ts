import {defineConfig, loadEnv} from '@rsbuild/core';
import {pluginSvelte} from '@rsbuild/plugin-svelte';

const {publicVars} = loadEnv({prefixes: ['SVELTE_APP']});

export default defineConfig({
  source: {
    define: publicVars,
  },
  plugins: [pluginSvelte()],
  html: {
    template: 'src/index.html',
  }
})
