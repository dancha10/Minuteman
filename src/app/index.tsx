import { FC, useEffect } from 'react'
import { useStore } from 'effector-react'

import { withProviders } from 'app/providers'
import { checkedAuth } from 'processes/auth'
import { NotificationWrapper } from 'entities/notification'
import { Error, ErrorModel } from 'entities/error'
import { Router } from 'pages'

import 'app/styles/main.scss'

const App: FC = () => {
	const errorMessage = useStore(ErrorModel.$errorMessage)

	useEffect(() => {
		checkedAuth()
	}, [])

	return (
		<>
			<Router />
			<NotificationWrapper />
			<Error isActive={!!errorMessage}>{errorMessage}</Error>
		</>
	)
}

export default withProviders(App)
