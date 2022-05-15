import { FC, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'effector-forms'

import { Button } from 'shared/ui/atoms/button'
import { Input } from 'shared/ui/atoms/input'
import { SCREENS } from 'shared/lib'

import { recoveryForm } from '../model'

import './style.scss'

export const RecoveryPassword: FC = () => {
	const { fields, hasError, submit } = useForm(recoveryForm)

	const navigate = useNavigate()

	const goBack = () => navigate(SCREENS.LOGIN)

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		submit()
	}

	return (
		<form className='recovery-password' id='recovery-password' onSubmit={onSubmit}>
			<Input.Modified
				type='text'
				label='Электронная почта'
				id='email'
				placeholder='Введите электронную почту'
				onChange={fields.email.onChange}
				value={fields.email.value}
				isError={hasError('email')}
				errorMessage={fields.email?.errors[0]?.errorText}
			/>
			<div className='recovery-password__button-area'>
				<Button.Dark type='submit'>Отправить код</Button.Dark>
				<Button.Light onClickHandler={goBack}>Отмена</Button.Light>
			</div>
		</form>
	)
}
