import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useNotification } from 'entities/notification'
import { Button } from 'shared/ui/atoms/button'
import { Input } from 'shared/ui/atoms/input'
import { authValidation, SCREENS } from 'shared/lib'

import './style.scss'

interface IRecoveryField {
	email: string
}

export const RecoveryPassword: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IRecoveryField>({ mode: 'onChange' })

	const notify = useNotification()
	const navigate = useNavigate()

	const goBack = () => navigate(SCREENS.LOGIN)

	const onSubmit: SubmitHandler<IRecoveryField> = data => {
		console.log(data)
		if (Math.floor(Math.random() * 2)) {
			// Имитация бэка
			return notify('success', 'Пароль изменен', 'Код успешно отправлен на вашу почту!')
		}
		return notify('error', 'Что-то не так...', 'Не получилось отправить код. Попробуйте еще раз!')
	}

	return (
		<form className='recovery-password' id='recovery-password' onSubmit={handleSubmit(onSubmit)}>
			<Input.Modified
				validation={{ ...register('email', authValidation.email) }}
				type='text'
				label='Электронная почта'
				id='email'
				placeholder='Введите электронную почту'
				isError={!!errors.email?.message}
				errorMessage={errors.email?.message}
			/>
			<div className='recovery-password__button-area'>
				<Button.Dark type='submit'>Отправить код</Button.Dark>
				<Button.Light onClickHandler={goBack}>Отмена</Button.Light>
			</div>
		</form>
	)
}
