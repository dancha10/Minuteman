import { FC, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

import { Footer } from 'shared/ui/organisms/footer'
import { Container } from 'shared/ui/atoms/container'
import { Header } from 'widgets/header' // Методологией не регламентируется + мне кажется это лучше чем получать нужные
// данные для хедера на уровне роутинга и через 100500 компонентов устраивать пропсдриллинг

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
