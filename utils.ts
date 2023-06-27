export const toText = async (response: Response) => response.text()
export const toJson = async (response: Response) => response.json()

export const jsonp = async (url: string, func: (code: string) => string) => {
	const code = await fetch(url).then(toText)
	// eslint-disable-next-line no-new-func
	return new Function(func(code))() as unknown
}
