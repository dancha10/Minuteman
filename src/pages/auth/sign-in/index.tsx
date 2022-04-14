import { FC } from 'react'
import { useStore } from 'effector-react'

import { AuthArea } from 'widgets/auth-area'
import { Container } from 'shared/ui/atoms/container'
import { AuthContainer } from 'shared/ui/templates/auth-container'
import { Error, ErrorModel } from 'entities/error'

import './style.scss'

const SignInPage: FC = () => {
	const errorMessage = useStore(ErrorModel.$errorMessage)
	return (
		<AuthContainer>
			<Container>
				<div className='login-page'>
					<AuthArea />
				</div>
			</Container>
			<Error isActive={!!errorMessage}>{errorMessage}</Error>
		</AuthContainer>
	)
}

export default SignInPage
