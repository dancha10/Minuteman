import { FC, FormEvent, useEffect } from 'react'
import { useForm } from 'effector-forms'
import { useStore } from 'effector-react'

import { CubeLoader } from 'shared/ui/atoms/cube-loader'
import { Button } from 'shared/ui/atoms/button'
import { Input } from 'shared/ui/atoms/input'
import { ErrorModel } from 'entities/error'

import { authFx, loginForm } from '../model'

import './style.scss'

export const AuthFormByEmail: FC = () => {
	const { fields, submit, hasError, reset } = useForm(loginForm)
	const isErrorToServer = useStore(ErrorModel.$errorMessage)
	const isLoading = useStore(authFx.pending)

	useEffect(() => {
		reset()
	}, [])

	const isDisabledSubmitButton = !!isErrorToServer || !!fields.email.errors.length || !!fields.password.errors.length

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		submit()
	}

	return (
		<form className='auth-form' id='login-form' onSubmit={onSubmit}>
			{isLoading && <CubeLoader isFull />}
			<div className='auth-form__field'>
				<Input.Modified
					id='login'
					type='text'
					label='Логин'
					placeholder='Введите логин'
					onChange={fields.email.onChange}
					isError={hasError('email') || !!isErrorToServer}
					errorMessage={fields.email?.errors[0]?.errorText}
					value={fields.email.value}
				/>
			</div>
			<div className='auth-form__field'>
				<Input.Modified
					id='password'
					type='password'
					label='Пароль'
					placeholder='Введите пароль'
					onChange={fields.password.onChange}
					isError={hasError('password') || !!isErrorToServer}
					errorMessage={fields.password?.errors[0]?.errorText}
					value={fields.password.value}
				/>
			</div>
			<div className='auth-form__button-area'>
				<Button.Dark type='submit' disabled={isDisabledSubmitButton}>
					Войти
				</Button.Dark>
			</div>
		</form>
	)
}
