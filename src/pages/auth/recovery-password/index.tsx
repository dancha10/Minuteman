import { FC } from 'react'

import { RecoveryArea } from 'widgets/recovery-area'
import { AuthContainer } from 'shared/ui/templates/auth-container'
import { Container } from 'shared/ui/atoms/container'

import './style.scss'

const RecoveryPasswordPage: FC = () => {
	return (
		<AuthContainer>
			<Container>
				<div className='recovery-page'>
					<RecoveryArea />
				</div>
			</Container>
		</AuthContainer>
	)
}

export default RecoveryPasswordPage
