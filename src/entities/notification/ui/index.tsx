import { FC, useCallback } from 'react'
import { useStore } from 'effector-react'
import classList from 'classnames'

import { Icon } from 'shared/ui/atoms/icon'

import { $isActiveNotification, $typeNotify, INotification, notificationClosed, setNotify } from '../model'

import './style.scss'

export const useNotification = () => {
	return useCallback((type: INotification['type'], title: string, message: string) => {
		setNotify({ type, title, message })
	}, [])
}

export const NotificationWrapper: FC = () => {
	const notifyType = useStore($typeNotify)
	const isActive = useStore($isActiveNotification)

	return (
		<div className='notification-wrapper'>
			{notifyType.map(notify => (
				<div
					key={notify.title}
					className={classList('notification-wrapper__item', {
						'notification-wrapper__item--exit': isActive,
					})}
				>
					<Notification type={notify.type} title={notify.title} message={notify.message} key={notify.message} />
				</div>
			))}
		</div>
	)
}

// Было лень юзать classList

export const Notification: FC<INotification> = ({ type, message, title }) => {
	return (
		<div className={type === 'success' ? 'notification notification--success' : 'notification notification--error'}>
			<div
				className={
					type === 'success'
						? 'notification__circle notification__circle--access'
						: 'notification__circle notification__circle--error'
				}
			>
				<div
					className={
						type === 'success'
							? 'notification__circle-inner notification__circle-inner--access'
							: 'notification__circle-inner notification__circle-inner--error'
					}
				>
					{type === 'success' ? <Icon name='check' /> : <Icon name='cross' />}
				</div>
			</div>
			<div className='notification__bubble'>
				{type === 'success' ? <Icon name='greenBubbles' /> : <Icon name='redBubbles' />}
			</div>
			<div className='notification__message'>
				<div className='notification__title'>{title}</div>
				<p>{message}</p>
			</div>
			<div className='notification__close'>
				<button onClick={() => notificationClosed(true)}>
					<Icon name='close' />
				</button>
			</div>
		</div>
	)
}
