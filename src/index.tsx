import React from 'react'
import ReactDOM from 'react-dom'

import App from 'app'
import { GlobalStyles } from 'app/styles/global'

ReactDOM.render(
	<>
		<App />
		<GlobalStyles />
	</>,
	document.getElementById('main')
)
