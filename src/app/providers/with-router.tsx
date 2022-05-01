import { ReactNode, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { CubeLoader } from 'shared/ui/atoms/cube-loader'

export const withRouter = (component: () => ReactNode) => () => {
	return (
		<BrowserRouter>
			<Suspense fallback={<CubeLoader />}>{component()}</Suspense>
		</BrowserRouter>
	)
}
