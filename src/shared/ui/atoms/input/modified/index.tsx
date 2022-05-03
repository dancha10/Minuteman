import { FC, useState } from 'react'

import { Types } from 'shared/lib'

import { ReactComponent as Eye } from './eye.svg'
import { ReactComponent as EyeClosed } from './eyeClosed.svg'
import { ReactComponent as ErrorInformation } from './info.svg'

import './style.scss'

interface IInputModified extends Types.IInput {
	type: 'text' | 'password'
	label: string
	errorMessage?: string
	id: string
	maxLength?: number
}

export const Modified: FC<IInputModified> = ({
	type,
	placeholder,
	label,
	id,
	isError,
	errorMessage,
	validation,
	disabled,
	onChange,
	defaultValue,
	value,
	maxLength,
}) => {
	const [isVisibleContent, setIsVisibleContent] = useState<boolean>(type === 'text')
	const [isActive, setIsActive] = useState(false)
	const changedActive = (value: string) => (value.length ? setIsActive(true) : setIsActive(false))

	return (
		<label htmlFor={id} className='input-field'>
			{label}
			<div className='input-field__container'>
				<input
					{...validation}
					type={isVisibleContent ? 'text' : 'password'}
					placeholder={placeholder}
					className='input-field__input'
					data-is-password={type === 'password'}
					data-is-active={isActive}
					data-is-error={isError}
					id={id}
					onInput={event => {
						changedActive(event.currentTarget.value)
						onChange && onChange(event.currentTarget.value)
					}}
					maxLength={maxLength}
					disabled={disabled}
					value={value}
					defaultValue={defaultValue}
					// TODO режим onChange mode из react-hook-form конфликтует с onChange инпута чтоб навешивать active-классы
				/>
				<div className='input-field__assistants-area'>
					{type === 'password' && (
						<button
							type='button'
							className='input-field__eye'
							data-is-active={isActive}
							onClick={() => setIsVisibleContent(prev => !prev)}
						>
							{isVisibleContent ? <EyeClosed /> : <Eye />}
						</button>
					)}
					{errorMessage && isError && (
						<div className='input-field__warning' data-error={errorMessage}>
							<ErrorInformation />
						</div>
					)}
				</div>
			</div>
		</label>
	)
}
