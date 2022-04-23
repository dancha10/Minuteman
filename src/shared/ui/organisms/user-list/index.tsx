import { FC } from 'react'

import { IUserViewer, UserViewer } from 'shared/ui/molecules/user-viewer'

import './style.scss'

interface IUserList extends IUserViewer {
	information: string
	status: 'studying' | 'expelled' | 'graduated'
}

export const UserList: FC<IUserList> = ({ fullName, image, information, status }) => {
	const chooseStatus = (status: IUserList['status']) => {
		switch (status) {
			case 'studying':
				return <div className={`list-user__status-button list-user__status-button--${status}`}>Обучается</div>
			case 'expelled':
				return <div className={`list-user__status-button list-user__status-button--${status}`}>Отчислен</div>
			case 'graduated':
				return <div className={`list-user__status-button list-user__status-button--${status}`}>Закончил</div>
			default:
				return <div className='list-user__status-button list-user__status-button--studying'>Обучается</div>
		}
	}

	return (
		<div className='list-user'>
			<div className='list-user__presentation'>
				<UserViewer fullName={fullName} image={image} />
			</div>
			<div className='list-user__information'>{information}</div>
			<div className='list-user__status'>{chooseStatus(status)}</div>
		</div>
	)
}
