import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useStore } from 'effector-react'

import { Button } from 'shared/ui/atoms/button'
import { Input } from 'shared/ui/atoms/input'
import { authValidation, userData, changedAuthenticated, SCREENS } from 'shared/lib'
import { ErrorModel } from 'entities/error'

import { IAuthFormFields, sentAuthForm } from '../model'

import './style.scss'

export const AuthFormByEmail: FC = () => {
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { errors },
	} = useForm<IAuthFormFields>({ mode: 'onChange' })

	const onSubmit: SubmitHandler<IAuthFormFields> = data => {
		sentAuthForm(data)
		const findUser = userData.find(user => user.login === data.login && user.password === data.password) // имитация бэка
		if (findUser) {
			changedAuthenticated(true)
			navigate(SCREENS.MAIN)
			reset()
		} else {
			ErrorModel.setError('Такого пользователя не существует')
		}
	}

	const disabledButton = (): boolean => !!isErrorToServer || !getValues('login') || !getValues('password')

	const isErrorToServer = useStore(ErrorModel.$errorMessage)
	return (
		<form className='auth-form' id='login-form' onSubmit={handleSubmit(onSubmit)}>
			<div className='auth-form__field'>
				<Input.Modified
					validation={{ ...register('login', authValidation.email) }}
					type='text'
					placeholder='Введите логин'
					label='Логин'
					isError={!!errors.login || !!isErrorToServer}
					errorMessage={errors.login?.message}
					id='login'
				/>
			</div>
			<div className='auth-form__field'>
				<Input.Modified
					validation={{ ...register('password', authValidation.password) }}
					type='password'
					placeholder='Введите пароль'
					label='Пароль'
					isError={!!errors.password || !!isErrorToServer}
					errorMessage={errors.password?.message}
					id='password'
				/>
			</div>
			<div className='auth-form__button-area'>
				<Button.Dark type='submit' color='red' disabled={disabledButton()}>
					Войти
				</Button.Dark>
			</div>
		</form>
	)
}
