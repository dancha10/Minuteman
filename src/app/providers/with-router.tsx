import { ReactNode, Suspense } from 'react'

export const withRouter = (component: () => ReactNode) => () => {
	return <Suspense fallback={<h2>Loading...</h2>}>{component()}</Suspense>
}
