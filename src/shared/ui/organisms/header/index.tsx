import { FC } from 'react'
import { useStore } from 'effector-react'
import { useNavigate } from 'react-router-dom'

import { Container } from 'shared/ui/atoms/container'
import { UserViewer } from 'shared/ui/molecules/user-viewer'
import { Button } from 'shared/ui/atoms/button'
import { Logo } from 'shared/ui/atoms/logo'
import { RouterLink } from 'shared/ui/atoms/router-link'
import { $isMobileWidth, SCREENS } from 'shared/lib'

import { ReactComponent as MobileProfile } from './profile.svg'

import './style.scss'

interface IHeader {
	type: 'primary' | 'dark'
}

export const Header: FC<IHeader> = ({ type }) => {
	const navigate = useNavigate()
	const isMobileWidth = useStore($isMobileWidth)

	const goToAdminPanel = () => {
		navigate(SCREENS.USERS)
	}

	return (
		<header className={`header header--${type}`}>
			<Container>
				<div className='header__container'>
					{type === 'primary' ? (
						<>
							<UserViewer
								fullName='Даниил Абраменко'
								image='https://sun9-36.userapi.com/impf/c849332/v849332182/d8a7e/SzEtiqLuErs.jpg?size=960x1280&quality=96&sign=4ae6bc474b03e1683da4b35cf31ac851&type=album'
								isMobileWidth={isMobileWidth}
							/>
							<Logo />
							<RouterLink to={SCREENS.USERS} classname=''>
								<Button.Dark onClickHandler={goToAdminPanel}>
									{isMobileWidth ? <MobileProfile /> : 'Панель управления'}
								</Button.Dark>
							</RouterLink>
						</>
					) : (
						<>
							<div className='header__left-container'>
								<UserViewer
									fullName='Даниил Абраменко'
									image='https://sun9-36.userapi.com/impf/c849332/v849332182/d8a7e/SzEtiqLuErs.jpg?size=960x1280&quality=96&sign=4ae6bc474b03e1683da4b35cf31ac851&type=album'
									isMobileWidth={isMobileWidth}
								/>
								<h3>Панель управления</h3>
							</div>
							<div className='header__right-container'>
								<RouterLink to={SCREENS.LANDING} classname=''>
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
