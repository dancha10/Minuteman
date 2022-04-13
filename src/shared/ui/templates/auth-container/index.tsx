import { FC } from 'react'

import { Footer } from 'shared/ui/organisms/footer'

import { ReactComponent as Logo } from './logo.svg'

import './style.scss'

export const AuthContainer: FC = ({ children }) => {
	return (
		<div className='auth-container'>
			<header className='auth-container__header'>
				<a href='https://ilink.dev/promo/academy.html' target='_blank' rel='noreferrer'>
					<Logo />
				</a>
			</header>
			<main className='auth-container__body'>{children}</main>
			<Footer />
		</div>
	)
}
