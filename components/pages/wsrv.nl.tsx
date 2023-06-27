import {useState, useMemo} from 'preact/hooks'
import {Input} from '../input.jsx'
import {Form} from '../form.jsx'

export function WsrvNl() {
	const [form, setForm] = useState<FormData>()
	const {w, h, fit, output} = Object.fromEntries(form ?? []) as Record<string, string>

	const result = new URL('https://wsrv.nl')
	result.search = String(new URLSearchParams([...(form ?? [])] as Array<[string, string]>))

	const FitTypes = useMemo(() => ['inside', 'outside', 'cover', 'fill', 'contain'].map((type, index) => (
		<label key={type}>
			<input name="fit" type="radio" value={type} checked={index === 0}/> {type}
		</label>
	)), [])
	const Alignments = useMemo(() => ['top-left', 'top', 'top-right', 'left', 'center', 'right', 'bottom-left', 'bottom', 'bottom-right'].map((type, index) => (
		<label key={type}>
			<input name="a" type="radio" value={type} checked={index === 4}/> {type}
		</label>
	)), [])
	const Masks = useMemo(() => ['circle', 'ellipse', 'triangle', 'triangle-180', 'pentagon', 'pentagon-180', 'hexagon', 'square', 'star', 'heart'].map(type => (
		<label key={type}>
			<input name="mask" type="radio" value={type}/> {type}
		</label>
	)), [])
	const Outputs = useMemo(() => ['jpg', 'png', 'gif', 'tiff', 'webp', 'json'].map(type => (
		<label key={type}>
			<input name="output" type="radio" value={type}/> {type}
		</label>
	)), [])

	return (
		<>
			<Form
				class="[&_details]:p-0 [&_fieldset]:flex [&_fieldset]:flex-wrap [&_fieldset]:gap-2 [&_legend]:mb-2 [&_fieldset_label]:capitalize"
				onChange={({currentTarget: target}) => {
					if (target.reportValidity()) {
						setForm(new FormData(target))
					}
				}}
			>
				<label>
					Image
					<Input name="url" type="url"/>
				</label>
				<details>
					<summary>Size</summary>
					<div class="flex gap-2">
						<label>
							Width <input name="w" type="number" class="p-1 border rounded w-10ch"/>
						</label>
						<label>
							Height <input name="h" type="number" class="p-1 border rounded w-10ch"/>
						</label>
					</div>
					<label>
						Device pixel ratio (1-8; requires width/height) <input
							name="dpr" type="number" class="p-1 border rounded w-5ch"
							min="1" max="8"
							disabled={!w && !h}
						/>
					</label>
				</details>
				<details>
					<summary>Fit</summary>
					<fieldset>
						<legend>Fit</legend>
						{FitTypes}
					</fieldset>
					<label>
						<input name="we" type="checkbox"/> Without enlargement
					</label>
				</details>
				<details>
					<summary>Crop</summary>
					<fieldset
						class="important:grid grid-cols-3"
						disabled={!w || !h || !['cover', 'contain'].includes(fit ?? '')}
					>
						<legend>Alignment position (requires width, height, and cover/contain fit)</legend>
						{Alignments}
					</fieldset>
				</details>
				<details>
					<summary>Mask</summary>
					<fieldset>
						<legend>Mask type</legend>
						{Masks}
					</fieldset>
				</details>
				<details>
					<summary>Orientation</summary>
					<div class="flex gap-2">
						<label>
							<input name="flip" type="checkbox"/> Flip
						</label>
						<label>
							<input name="flop" type="checkbox"/> Flop
						</label>
					</div>
				</details>
				<details>
					<summary>Adjustment</summary>
					<label>
						Background
						<Input name="bg"/>
					</label>
				</details>
				<details>
					<summary>Format</summary>
					<fieldset class="important:[&_label]:uppercase">
						<legend>Output</legend>
						{Outputs}
					</fieldset>
					<label>
						Quality (1-100; requires jpg/tiff/webp output)
						<Input
							name="q" type="number"
							value="80" min="1" max="100"
							disabled={output ? !['jpg', 'tiff', 'webp'].includes(output) : false}
						/>
					</label>
				</details>
			</Form>
			{form?.get('url') && <img src={result.href}/>}
		</>
	)
}
