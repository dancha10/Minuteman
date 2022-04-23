import { FC, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from 'shared/ui/organisms/header'
import { Footer } from 'shared/ui/organisms/footer'
import { Container } from 'shared/ui/atoms/container'

import './style.scss'

interface IAdminPanelContainer {
	navbar: ReactNode
}

const AdminPanelContainer: FC<IAdminPanelContainer> = ({ navbar }) => {
	return (
		<div className='admin-panel'>
			<Header type='dark' />
			<div className='admin-panel__container'>
				<Container>
					<div className='admin-panel__wrapper'>
						<aside className='admin-panel__navbar'>{navbar}</aside>
						<main className='admin-panel__body'>
							<Outlet />
						</main>
					</div>
				</Container>
			</div>
			<div className='admin-panel__footer'>
				<Footer />
			</div>
		</div>
	)
}

export default AdminPanelContainer
