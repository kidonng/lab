import {useState} from 'preact/hooks'

declare global {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Array<T> {
		// https://github.com/microsoft/TypeScript/pull/51367/files#diff-3ed340dfb0a8b9386d29b464e786263f5e2c80117f987d5365b46b0caaf0e14dR67
		with(index: number, value: T): T[];
	}
}

const icons = new Map([
	['0 bomb around', 'https://static.wikia.nocookie.net/gensin-impact/images/b/b8/Icon_Emoji_017_Sucrose_OK.png'],
	['1 bomb around', 'https://static.wikia.nocookie.net/gensin-impact/images/c/ca/Item_Cabbage.png'],
	['2 bombs around', 'https://static.wikia.nocookie.net/gensin-impact/images/f/f0/Item_Iron_Chunk.png'],
	['Bomb', 'https://static.wikia.nocookie.net/gensin-impact/images/3/32/The_Recollector%27s_Path_Curio_Withered_Barrel.png'],
])
const empty = 4

export function OldChou() {
	const [blocks, setBlocks] = useState(Array.from<number>({length: 25}).fill(empty))

	return (
		<>
			<div class="grid grid-cols-5 gap-4">
				{blocks.map((block, index) => (
					// eslint-disable-next-line react/jsx-key
					<button
						type="button"
						class="w-[64px] h-[64px] border-2 rounded"
						onClick={() => {
							setBlocks(blocks.with(index, block > 2 ? 0 : block + 1))
						}}
					>
						{block !== empty && <img src={[...icons.values()][block]}/>}
					</button>
				))}
			</div>
			<h2 class="text-xl">Legends</h2>
			<ul>
				{[...icons].map(([name, src]) => (
					// eslint-disable-next-line react/jsx-key
					<li>
						<img src={src} class="inline w-[48px]"/> {name}
					</li>
				))}
			</ul>
		</>
	)
}
