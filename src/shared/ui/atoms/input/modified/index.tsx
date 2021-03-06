import { FC, useState } from 'react'

import { Types } from 'shared/lib'
import { Icon } from 'shared/ui/atoms/icon'

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

	const onChangeText = (value: string) => {
		changedActive(value)
		onChange && onChange(value)
	}

	return (
		<label htmlFor={id} className='input-field'>
			{label}
			<div className='input-field__container'>
				<input
					{...validation}
					id={id}
					type={isVisibleContent ? 'text' : 'password'}
					placeholder={placeholder}
					className='input-field__input'
					data-is-password={type === 'password'}
					data-is-active={isActive}
					data-is-error={isError}
					onChange={event => onChangeText(event.target.value)}
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
							{isVisibleContent ? <Icon name='eyeClosed' /> : <Icon name='eye' />}
						</button>
					)}
					{errorMessage && isError && (
						<div className='input-field__warning' data-error={errorMessage}>
							<Icon name='info' />
						</div>
					)}
				</div>
			</div>
		</label>
	)
}
