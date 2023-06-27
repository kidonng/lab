import {clsx} from 'clsx'

export function Skeleton({class: className}: {class: string}) {
	return (
		<div
			class={clsx(
				'bg-gray-200 @dark:bg-neutral-800 rounded animate-pulse',
				className,
			)}
		/>
	)
}
