import { FC, useCallback } from 'react'
import { useStore } from 'effector-react'
import classList from 'classnames'

import { ReactComponent as GreenBubble } from '../lib/greenBubbles.svg'
import { ReactComponent as RedBubble } from '../lib/redBubbles.svg'
import { ReactComponent as Check } from '../lib/check.svg'
import { ReactComponent as Cross } from '../lib/cross.svg'
import { ReactComponent as Close } from '../lib/close.svg'
import {
	$isActiveNotification,
	$typeNotify,
	INotification,
	notificationClosed,
	setTypeNotify,
} from '../model'

import './style.scss'

export const useNotification = () => {
	return useCallback((type: INotification['type']) => setTypeNotify(type), [])
}

export const NotificationWrapper: FC = () => {
	const notifyType = useStore($typeNotify)
	const isActive = useStore($isActiveNotification)

	return (
		<div className='notification-wrapper'>
			{notifyType.map(notify => (
				<div
					key={notify}
					className={classList('notification-wrapper__item', {
						'notification-wrapper__item--exit': isActive,
					})}
				>
					<Notification type={notify} />
				</div>
			))}
		</div>
	)
}

// Было лень юзать classList

export const Notification: FC<INotification> = ({ type }) => {
	return (
		<div
			className={
				type === 'success'
					? 'notification notification--success'
					: 'notification notification--error'
			}
		>
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
					{type === 'success' ? <Check /> : <Cross />}
				</div>
			</div>
			<div className='notification__bubble'>
				{type === 'success' ? <GreenBubble /> : <RedBubble />}
			</div>
			<div className='notification__message'>
				<div className='notification__title'>
					{type === 'success' ? 'Успешно!' : 'Что-то не так...'}
				</div>
				<p>
					{type === 'success'
						? 'Спасибо за отзыв о нашей компании :)'
						: 'Не получилось отправить отзыв. Попробуйте еще раз!'}
				</p>
			</div>
			<div className='notification__close'>
				<button onClick={() => notificationClosed(true)}>
					<Close />
				</button>
			</div>
		</div>
	)
}
