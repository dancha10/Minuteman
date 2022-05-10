import { FC, useEffect } from 'react'
import { useStore } from 'effector-react'

import { Container } from 'shared/ui/atoms/container'
import { UserViewer } from 'shared/ui/molecules/user-viewer'
import { Button } from 'shared/ui/atoms/button'
import { Logo } from 'shared/ui/atoms/logo'
import { RouterLink } from 'shared/ui/atoms/router-link'
import { $isMobileWidth, SCREENS } from 'shared/lib'
import { $userData, getUserData } from 'widgets/header/model'

import { ReactComponent as MobileProfile } from '../lib/profile.svg'

import './style.scss'

interface IHeader {
	type: 'primary' | 'dark'
}

export const Header: FC<IHeader> = ({ type }) => {
	const isMobileWidth = useStore($isMobileWidth)

	useEffect(() => {
		getUserData()
	}, [])

	const userData = useStore($userData)

	return (
		<header className={`header header--${type}`}>
			<Container>
				<div className='header__container'>
					{type === 'primary' ? (
						<>
							<UserViewer
								fullName={`${userData?.firstName} ${userData?.lastName}`}
								image={`https://academtest.ilink.dev/images/${userData?.profileImage}`}
								isMobileWidth={isMobileWidth}
							/>
							<Logo />
							<RouterLink to={SCREENS.USERS} classname=''>
								<Button.Dark>{isMobileWidth ? <MobileProfile /> : 'Панель управления'}</Button.Dark>
							</RouterLink>
						</>
					) : (
						<>
							<div className='header__left-container'>
								<UserViewer
									fullName={`${userData?.firstName} ${userData?.lastName}`}
									image={`https://academtest.ilink.dev/images/${userData?.profileImage}`}
									isMobileWidth={isMobileWidth}
								/>
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
