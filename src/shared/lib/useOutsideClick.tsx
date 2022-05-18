import { MutableRefObject, useEffect } from 'react'

export function useOutsideClick(ref: MutableRefObject<HTMLDivElement>, callback: () => void): void {
	const handleClick = (event: MouseEvent) => {
		if (ref.current && !ref?.current?.contains(event.target as Node)) {
			callback()
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClick)

		return () => {
			document.removeEventListener('click', handleClick)
		}
	})
}
