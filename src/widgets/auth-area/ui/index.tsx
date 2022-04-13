import { FC } from 'react'

import { AuthFormByEmail } from 'features/auth/by-email'
import { FormWrapper } from 'shared/ui/molecules/form-wrapper'
import { RouterLink } from 'shared/ui/atoms/router-link'
import { SCREENS } from 'shared/lib'

import './style.scss'

export const AuthArea: FC = () => {
	return (
		<FormWrapper title='Войти'>
			<AuthFormByEmail />
			<div className='login-area'>
				<RouterLink to={SCREENS.RECOVERY} classname='login-area__redirect'>
					Забыли пароль?
				</RouterLink>
			</div>
		</FormWrapper>
	)
}
