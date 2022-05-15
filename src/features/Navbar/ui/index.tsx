import { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

import { Icon } from 'shared/ui/atoms/icon'
import { SCREENS } from 'shared/lib'

import './style.scss'

type RouterTypes = {
	endpoint: SCREENS
	icon: ReactNode
	title: string
}

const routerElements: Array<RouterTypes> = [
	{
		endpoint: SCREENS.USERS,
		icon: <Icon name='users' />,
		title: 'Участники',
	},
	{
		endpoint: SCREENS.REVIEWS,
		icon: <Icon name='chat' />,
		title: 'Отзывы',
	},
	{
		endpoint: SCREENS.PROFILE,
		icon: <Icon name='paper' />,
		title: 'Обо мне',
	},
]

export const NavBar: FC = () => {
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
