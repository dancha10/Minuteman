import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from 'shared/ui/atoms/button'
import { Input } from 'shared/ui/atoms/input'
import { authValidation } from 'shared/lib'

import { IAuthFormFields, sentAuthForm } from '../model'

import './style.scss'

export const AuthFormByEmail: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IAuthFormFields>({ mode: 'onChange' })

	const onSubmit: SubmitHandler<IAuthFormFields> = data => sentAuthForm(data)

	const [isErrorToServer] = useState(false) // TODO effector failData

	return (
		<form className='auth-form' id='login-form' onSubmit={handleSubmit(onSubmit)}>
			<div className='auth-form__field'>
				<Input.Modified
					validation={{ ...register('login', authValidation.email) }}
					type='text'
					placeholder='Введите логин'
					label='Логин'
					isError={!!errors.login || isErrorToServer}
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
					isError={!!errors.password || isErrorToServer}
					errorMessage={errors.password?.message}
					id='password'
				/>
			</div>
			<div className='auth-form__button-area'>
				<Button.Dark type='submit' disabled={false}>
					Войти
				</Button.Dark>
			</div>
		</form>
	)
}
