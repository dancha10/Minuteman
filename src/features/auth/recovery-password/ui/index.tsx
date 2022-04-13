import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from 'shared/ui/atoms/button'
import { Input } from 'shared/ui/atoms/input'
import { authValidation } from 'shared/lib'

import './style.scss'

interface IRecoveryField {
	email: string
}

export const RecoveryPassword: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IRecoveryField>()

	const onSubmit: SubmitHandler<IRecoveryField> = data => console.log(data)
	console.log(errors)

	return (
		<form className='recovery-password' id='recovery-password' onSubmit={handleSubmit(onSubmit)}>
			<Input.Modified
				type='text'
				label='Электронная почта'
				id='email'
				placeholder='Введите электронную почту'
				isError={false}
				errorMessage='fdsfsdf'
				validation={{ ...register('email', authValidation.email) }}
			/>
			<div className='recovery-password__button-area'>
				<Button.Dark type='submit'>Отправить код</Button.Dark>
				<Button.Light>Отмена</Button.Light>
			</div>
		</form>
	)
}
