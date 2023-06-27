import type {APIRoute} from 'astro'

export const prerender = false

// Can't use Vercel rewrite as QQ server checks the referer
export const get: APIRoute = async ({url}) => {
	const api = new URL('https://ptlogin2.qq.com/getface')
	api.search = url.search

	return fetch(api)
}
