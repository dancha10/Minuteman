import { FC, useState } from 'react'
import classList from 'classnames'

import { Types } from 'shared/lib'

import './style.scss'

interface ITextarea extends Types.IInput {
	maxLength: number
	isVisibleCounter?: boolean
	label?: string
	value?: string
}

export const Textarea: FC<ITextarea> = ({
	placeholder,
	maxLength,
	onChange,
	validation,
	isError,
	disabled,
	isVisibleCounter = true,
	label,
	value,
}) => {
	const [currentLength, setCurrentLength] = useState<number>(0)

	const changeValue = (value: string): void => setCurrentLength(value.length)

	const onChangeText = (text: string) => {
		changeValue(text)
		onChange && onChange(text)
	}

	return (
		<div className={classList('textarea', { 'textarea--error': isError })}>
			<label>
				{label}
				<textarea
					{...validation}
					placeholder={placeholder}
					onChange={event => onChangeText(event.target.value)}
					maxLength={maxLength}
					disabled={disabled}
					value={value}
				/>
				{isVisibleCounter && (
					<p className='textarea__counter'>
						{currentLength}/{maxLength}
					</p>
				)}
			</label>
		</div>
	)
}
