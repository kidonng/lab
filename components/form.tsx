import type {JSX} from 'preact'

export function Form(props: JSX.HTMLAttributes<HTMLFormElement>) {
	return (
		<form
			{...props}
			onSubmit={event => {
				event.preventDefault()
			}}
		/>
	)
}
