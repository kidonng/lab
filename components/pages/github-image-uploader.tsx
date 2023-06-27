import {useState, useEffect} from 'preact/hooks'
import {toJson} from '../../utils.js'
import {Input} from '../input.jsx'
import {Form} from '../form.jsx'
import {Skeleton} from '../skeleton.jsx'

export function GitHubImageUploader() {
	const [form, setForm] = useState<FormData>()
	const {image} = Object.fromEntries(form ?? []) as Record<string, string>
	const id = image && new URL(image).pathname.split('/')[1]

	const [data, setData] = useState<Record<string, string>>()
	useEffect(() => {
		setData(undefined)
		if (!id) {
			return
		}

		void fetch(`https://api.github.com/user/${id}`).then(toJson).then(setData)
	}, [id])

	return (
		<div class="flex flex-col gap-4">
			<Form
				onChange={({currentTarget: target}) => {
					if (target.reportValidity()) {
						setForm(new FormData(target))
					}
				}}
			>
				<label>
					Image
					<Input
						name="image"
						pattern="https:\/\/user-images\.githubusercontent\.com\/.+"
						placeholder="https://user-images.githubusercontent.com/"
					/>
				</label>
			</Form>
			{id && (
				<>
					<img
						src={`https://avatars.githubusercontent.com/u/${id}`}
						alt="Avatar"
						width="160"
						height="160"
						class="border rounded"
					/>
					<div class="flex gap-2">
						{data ? (
							<>
								{data['name'] && <strong>{data['name']}</strong>}
								<a href={data['html_url']}>@{data['login']}</a>
							</>
						) : (
							<>
								<Skeleton class="w-[160px] h-1em"/>
								<Skeleton class="w-[120px] h-1em"/>
							</>
						)}
					</div>
					<img src={image} class="border"/>
				</>
			)}
		</div>
	)
}
