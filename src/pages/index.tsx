import { FC, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useStore } from 'effector-react'

import { $isAuthenticated, SCREENS } from 'shared/lib'

const SignInPage = lazy(() => import('pages/auth/sign-in'))
const RecoveryPasswordPage = lazy(() => import('pages/auth/recovery-password'))
const LandingPage = lazy(() => import('pages/main'))

export const Router: FC = () => {
	const isAuthenticated = useStore($isAuthenticated)
	if (isAuthenticated) {
		return (
			<Routes>
				<Route path={SCREENS.MAIN} element={<LandingPage />} />
				<Route path={SCREENS.REDIRECT} element={<LandingPage />} />
			</Routes>
		)
	}
	return (
		<Routes>
			<Route path={SCREENS.LOGIN} element={<SignInPage />} />
			<Route path={SCREENS.RECOVERY} element={<RecoveryPasswordPage />} />
			<Route path={SCREENS.REDIRECT} element={<SignInPage />} />
		</Routes>
	)
}
