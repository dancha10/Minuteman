import { FC } from 'react'

import { Types } from 'shared/lib'
import { Icon } from 'shared/ui/atoms/icon'

import './style.scss'

interface IButtonDark extends Types.IButtonProps {
	addition?: boolean
	color?: 'primary' | 'red'
}

export const Dark: FC<IButtonDark> = ({
	type = 'button',
	disabled = false,
	onClickHandler,
	addition = false,
	color = 'primary',
	children,
}) => {
	return (
		<button type={type} className={`btn btn--dark btn--${color}`} onClick={onClickHandler} disabled={disabled}>
			{addition && <Icon name='addition' />}
			{children}
		</button>
	)
}
