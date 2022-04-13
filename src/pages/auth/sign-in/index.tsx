import { FC } from 'react'

import { AuthArea } from 'widgets/auth-area'
import { Container } from 'shared/ui/atoms/container'
import { AuthContainer } from 'shared/ui/templates/auth-container'

import './style.scss'

const SignInPage: FC = () => {
	return (
		<AuthContainer>
			<Container>
				<div className='login-page'>
					<AuthArea />
				</div>
			</Container>
		</AuthContainer>
	)
}

export default SignInPage
