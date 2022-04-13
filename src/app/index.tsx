import { FC } from 'react'

import { withProviders } from 'app/providers'
import { Router } from 'pages'

import 'app/styles/main.scss'

const App: FC = () => {
	return <Router />
}

export default withProviders(App)
