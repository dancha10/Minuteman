import { FC } from 'react'

import { withProviders } from 'app/providers'
import { NotificationWrapper } from 'entities/notification'
import { Router } from 'pages'

import 'app/styles/main.scss'

const App: FC = () => {
	return (
		<>
			<Router />
			<NotificationWrapper />
		</>
	)
}

export default withProviders(App)
