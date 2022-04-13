import { FC } from 'react'

import { Types } from 'shared/lib'

import './style.scss'

export const Light: FC<Types.IButtonProps> = ({ type = 'button', disabled = false, onClickHandler, children }) => {
	return (
		<button type={type} className='btn btn--light' onClick={onClickHandler} disabled={disabled}>
			{children}
		</button>
	)
}
