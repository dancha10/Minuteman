import { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

import { SCREENS } from 'shared/lib'

import { ReactComponent as Users } from '../lib/users.svg'
import { ReactComponent as Chat } from '../lib/chat.svg'
import { ReactComponent as Paper } from '../lib/paper.svg'

import './style.scss'

type RouterTypes = {
	endpoint: SCREENS
	icon: ReactNode
	title: string
}

export const NavBar: FC = () => {
	const routerElements: Array<RouterTypes> = [
		{
			endpoint: SCREENS.USERS,
			icon: <Users />,
			title: 'Участники',
		},
		{
			endpoint: SCREENS.REVIEWS,
			icon: <Chat />,
			title: 'Отзывы',
		},
		{
			endpoint: SCREENS.PROFILE,
			icon: <Paper />,
			title: 'Обо мне',
		},
	]
	return (
		<nav className='aside-router'>
			{routerElements.map(router => (
				<NavLink
					to={router.endpoint}
					className={({ isActive }) => `aside-router__viewer${isActive ? ' aside-router__viewer--active' : ''}`}
					key={router.endpoint}
				>
					<div className='aside-router__item'>
						{router.icon}
						{router.title}
					</div>
				</NavLink>
			))}
		</nav>
	)
}
