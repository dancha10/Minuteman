import { FC, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useStore } from 'effector-react'

import { SCREENS } from 'shared/lib'
import { AuthModel } from 'features/auth/by-email'
import { NavBar } from 'features/navbar'

const SignInPage = lazy(() => import('pages/auth/sign-in'))
const RecoveryPasswordPage = lazy(() => import('pages/auth/recovery-password'))
const LandingPage = lazy(() => import('pages/main'))
const AuthLayout = lazy(() => import('shared/ui/templates/auth-container'))
const AdminPanelContainer = lazy(() => import('shared/ui/templates/admin-container'))
const UserPage = lazy(() => import('pages/users'))
const ReviewsPage = lazy(() => import('pages/reviews'))
const ProfilePage = lazy(() => import('pages/profile/ui'))

export const Router: FC = () => {
	const isAuthenticated = useStore(AuthModel.$isAuthenticated)
	if (isAuthenticated) {
		return (
			<Routes>
				<Route path={SCREENS.LANDING} element={<LandingPage />} />
				<Route path={SCREENS.MAIN} element={<AdminPanelContainer navbar={<NavBar />} />}>
					<Route path={SCREENS.MAIN} element={<Navigate to={SCREENS.USERS} />} />
					<Route path={SCREENS.USERS} element={<UserPage />} />
					<Route path={SCREENS.REVIEWS} element={<ReviewsPage />} />
					<Route path={SCREENS.PROFILE} element={<ProfilePage />} />
				</Route>
				<Route path={SCREENS.REDIRECT} element={<Navigate to={SCREENS.USERS} />} />
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
