import { FC, useEffect } from 'react'
import { useStore } from 'effector-react'

import { Container } from 'shared/ui/atoms/container'
import { User, UserModel } from 'entities/user'
import { Button } from 'shared/ui/atoms/button'
import { Logo } from 'shared/ui/atoms/logo'
import { RouterLink } from 'shared/ui/atoms/router-link'
import { Icon } from 'shared/ui/atoms/icon'
import { $isMobileWidth, SCREENS } from 'shared/lib'

import './style.scss'

interface IHeader {
	type: 'primary' | 'dark'
}

export const Header: FC<IHeader> = ({ type }) => {
	const isMobileWidth = useStore($isMobileWidth)
	useEffect(() => {
		UserModel.getResponse()
	}, [])

	return (
		<header className={`header header--${type}`}>
			<Container>
				<div className='header__container'>
					{type === 'primary' ? (
						<>
							<User />
							<Logo />
							<RouterLink to={SCREENS.USERS} classname=''>
								<Button.Dark>{isMobileWidth ? <Icon name='profile' /> : 'Панель управления'}</Button.Dark>
							</RouterLink>
						</>
					) : (
						<>
							<div className='header__left-container'>
								<User />
								<h3>Панель управления</h3>
							</div>
							<div className='header__right-container'>
								<RouterLink to={SCREENS.LANDING}>
									<Logo color='white' />
								</RouterLink>
							</div>
						</>
					)}
				</div>
			</Container>
		</header>
	)
}
