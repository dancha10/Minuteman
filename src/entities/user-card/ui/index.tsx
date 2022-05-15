import { FC } from 'react'

import { Icon } from 'shared/ui/atoms/icon'

import { getCurrentAge } from '../model/model'

import './style.scss'

interface IUserCard {
	fullName?: string
	city?: string
	sex?: 'male' | 'female'
	yearBirth: string | null
	description?: string
	pets?: boolean
}

export const UserCard: FC<IUserCard> = ({ fullName, city, sex, yearBirth, description, pets }) => {
	return (
		<div className='user-card'>
			<div className='user-card__header'>
				<h3 className='user-card__fullName'>{fullName}</h3>
				<div className='user-card__year-birth'>{yearBirth}</div>
			</div>
			<ul className='user-card__info'>
				<li>
					<span className='user-card__tag'>Город:</span>
					{city}
				</li>
				<li>
					<span className='user-card__tag'>Пол:</span>
					{sex}
					{sex === 'male' ? <Icon name='male' /> : <Icon name='female' />}
				</li>
				<li>
					<span className='user-card__tag'>Возраст:</span>
					{getCurrentAge(yearBirth!)}
				</li>
			</ul>
			<p className='user-card__description'>
				<span className='user-card__tag'>О себе:</span>
				{description}
			</p>
			<div className='user-card__pet'>
				<Icon name='pet' />
				<span className='user-card__tag'>Домашнее животное:</span>
				{pets ? <span>есть</span> : <span>нет ;(</span>}
			</div>
		</div>
	)
}
