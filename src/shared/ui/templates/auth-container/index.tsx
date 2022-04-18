import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { Footer } from 'shared/ui/organisms/footer'
import { Logo } from 'shared/ui/atoms/logo'

import './style.scss'

const AuthContainer: FC = () => {
	return (
		<div className='auth-container'>
			<header className='auth-container__header'>
				<Logo color='white' />
			</header>
			<main className='auth-container__body'>
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}

export default AuthContainer
