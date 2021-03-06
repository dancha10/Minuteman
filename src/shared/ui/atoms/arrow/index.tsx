import { FC } from 'react'

import { Icon } from 'shared/ui/atoms/icon'

import './style.scss'

interface IArrowSlider {
	rotate?: number
	disabled?: boolean
	onClick: () => void
	classname?: string
}

export const ArrowSlider: FC<IArrowSlider> = ({ rotate, onClick, classname, disabled = false }) => {
	return (
		<button
			className={`arrow ${classname && classname}`}
			style={{ transform: `rotate(${rotate}deg)` }}
			disabled={disabled}
			onClick={onClick}
		>
			<Icon name='nextArrow' />
		</button>
	)
}
