import { FC } from 'react'

import { RecoveryArea } from 'widgets/recovery-area'
import { Container } from 'shared/ui/atoms/container'

import './style.scss'

const RecoveryPasswordPage: FC = () => {
	return (
		<Container>
			<div className='recovery-page'>
				<RecoveryArea />
			</div>
		</Container>
	)
}

export default RecoveryPasswordPage
