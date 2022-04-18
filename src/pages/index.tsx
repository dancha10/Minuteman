import { FC, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useStore } from 'effector-react'

import { $isAuthenticated, SCREENS } from 'shared/lib'

const SignInPage = lazy(() => import('pages/auth/sign-in'))
const RecoveryPasswordPage = lazy(() => import('pages/auth/recovery-password'))
const LandingPage = lazy(() => import('pages/main'))
const AuthLayout = lazy(() => import('shared/ui/templates/auth-container'))

export const Router: FC = () => {
	const isAuthenticated = useStore($isAuthenticated)
	if (isAuthenticated) {
		return (
			<Routes>
				<Route path={SCREENS.MAIN} element={<LandingPage />} />
				<Route path={SCREENS.REDIRECT} element={<Navigate to={SCREENS.MAIN} />} />
			</Routes>
		)
	}
	return (
		<Routes>
			<Route path={SCREENS.MAIN} element={<AuthLayout />}>
				<Route index element={<SignInPage />} />
				<Route path={SCREENS.RECOVERY} element={<RecoveryPasswordPage />} />
				<Route path={SCREENS.REDIRECT} element={<Navigate to={SCREENS.MAIN} />} />
			</Route>
		</Routes>
	)
}
