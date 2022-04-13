import { ReactNode, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Loader } from 'shared/ui/atoms/loader'

export const withRouter = (component: () => ReactNode) => () => {
	return (
		<BrowserRouter>
			<Suspense fallback={<Loader isFull />}>{component()}</Suspense>
		</BrowserRouter>
	)
}
