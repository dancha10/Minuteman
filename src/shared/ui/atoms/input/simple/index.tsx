import { FC } from 'react'
import classList from 'classnames'

import { Types } from 'shared/lib'

import './style.scss'

export const Simple: FC<Types.IInput> = ({ placeholder, disabled, validation, isError, onChange, value }) => {
	return (
		<input
			{...validation}
			type='text'
			placeholder={placeholder}
			onChange={onChange && (event => onChange(event.target.value))}
			className={classList('input', { 'input--error': isError })}
			disabled={disabled}
			value={value}
		/>
	)
}
