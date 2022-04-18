import { FC } from 'react'

import { AuthArea } from 'widgets/auth-area'
import { Container } from 'shared/ui/atoms/container'

import './style.scss'

const SignInPage: FC = () => {
	return (
		<Container>
			<div className='login-page'>
				<AuthArea />
			</div>
		</Container>
	)
}

export default SignInPage
