import { FC, lazy, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import { SCREENS } from 'shared/lib'

const SignInPage = lazy(() => import('pages/auth/sign-in'))
const RecoveryPasswordPage = lazy(() => import('pages/auth/recovery-password'))
const LandingPage = lazy(() => import('pages/main'))

export const Router: FC = () => {
	// TODO проверочку на isAuth
	const [isAuth] = useState(false)
	if (isAuth) {
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
