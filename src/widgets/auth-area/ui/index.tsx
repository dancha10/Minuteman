import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthFormByEmail } from 'features/auth/by-email'
import { FormWrapper } from 'shared/ui/molecules/form-wrapper'
import { SCREENS } from 'shared/lib'

import './style.scss'

export const AuthArea: FC = () => {
	const navigate = useNavigate()
	const goRedirect = () => navigate(SCREENS.RECOVERY)
	return (
		<FormWrapper title='Войти'>
			<AuthFormByEmail />
			<div className='login-area'>
				<button className='login-area__redirect' onClick={goRedirect}>
					Забыли пароль?
				</button>
			</div>
		</FormWrapper>
	)
}
