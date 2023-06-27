import {defineConfig} from 'astro/config'
import unocss from 'unocss/astro'
import {presetUno, presetTypography} from 'unocss'
import preact from '@astrojs/preact'
import vercel from '@astrojs/vercel/serverless'

export default defineConfig({
	integrations: [
		unocss({
			presets: [
				presetUno(),
				presetTypography(),
			],
			injectReset: true,
		}),
		preact(),
	],
	srcDir: '.',
	site: 'https://lab.xuann.wang/',
	output: 'hybrid',
	adapter: vercel(),
})
