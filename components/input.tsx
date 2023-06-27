import type {JSX} from 'preact'

export function Input(props: JSX.HTMLAttributes<HTMLInputElement>) {
	return <input {...props} class="mt-2 p-2 border-2 rounded-lg w-full"/>
}
