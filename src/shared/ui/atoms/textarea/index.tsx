import { FC, useState } from 'react'
import classList from 'classnames'

import { Types } from 'shared/lib'

import './style.scss'

interface ITextarea extends Types.IInput {
	maxLength: number
}

export const Textarea: FC<ITextarea> = ({ placeholder, maxLength, validation, isError, disabled }) => {
	const [currentLength, setCurrentLength] = useState<number>(0)

	const changeValue = (value: string): void => setCurrentLength(value.length)

	return (
		<div className={classList('textarea', { 'textarea--error': isError })}>
			<textarea
				{...validation}
				placeholder={placeholder}
				onChange={e => changeValue(e.target.value)}
				maxLength={maxLength}
				disabled={disabled}
			/>

			<p className='textarea__counter'>
				{currentLength}/{maxLength}
			</p>
		</div>
	)
}
