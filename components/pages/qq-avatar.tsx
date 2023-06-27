import {useState, useEffect, useMemo} from 'preact/hooks'
import {jsonp} from '../../utils.js'
import {Input} from '../input.jsx'
import {Form} from '../form.jsx'
import {Skeleton} from '../skeleton.jsx'

const api = async <T extends string>(qq: T) => {
	const data = await jsonp(
		`/qq-avatar/getface?imgtype=1&uin=${qq}`,
		// `pt.setHeader(...)`
		code => `
			const pt = {
				setHeader: (header) => header,
			}

			return ${code}
		`,
	) as Record<T, string>
	const avatar = new URL(data[qq])

	return {
		key: avatar.searchParams.get('k')!,
		salt: avatar.searchParams.get('kti')!,
		time: new Date(Number(avatar.searchParams.get('t')) * 1e3).toLocaleString(),
	}
}

export function QqAvatar() {
	const [form, setForm] = useState<FormData>()
	const {qq, size} = Object.fromEntries(form ?? []) as Record<string, string>
	const [data, setData] = useState<Awaited<ReturnType<typeof api>>>()

	const base = `https://q.qlogo.cn/g?b=qq&s=${size ?? ''}`
	const plain = `${base}&nk=${qq ?? ''}`
	const encrypted = `${base}&k=${data?.key ?? ''}&kti=${data?.salt ?? ''}`

	useEffect(() => {
		setData(undefined)
		if (!qq) {
			return
		}

		void api(qq).then(setData)
	}, [qq])

	const Sizes = useMemo(() => ['40', '100', '140', '640'].map((size, index) => (
		<label key={size}>
			<input name="size" type="radio" value={size} checked={index === 1}/> {size}px
		</label>
	)), [])

	return (
		<>
			<Form
				class="flex flex-col gap-4"
				onChange={({currentTarget: target}) => {
					if (target.reportValidity()) {
						setForm(new FormData(target))
					}
				}}
			>
				<label>
					QQ
					<Input
						name="qq"
						pattern="\d{5,}"
						placeholder="12345"
						inputMode="numeric"
					/>
				</label>
				<fieldset class="flex gap-2">
					<legend class="mb-2">Size</legend>
					{Sizes}
				</fieldset>
			</Form>
			{qq && (
				<>
					<ul>
						<li>
							Plain: <a href={plain} class="break-all">{plain}</a>
						</li>
						<li>
							Encrypted:{' '}
							{data
								? <a href={encrypted} class="break-all">{encrypted}</a>
								: <Skeleton class="w-20ch h-1em inline-block v-middle"/>}
						</li>
						<li>
							Updated at <strong>{data?.time ?? <Skeleton class="w-20ch h-1em inline-block v-middle"/>}</strong>
						</li>
					</ul>
					<img
						src={plain}
						alt="Avatar"
						width={size}
						height={size}
						class="border rounded"
					/>
				</>
			)}
		</>
	)
}
