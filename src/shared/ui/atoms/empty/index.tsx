import { FC } from 'react'

import { Icon } from 'shared/ui/atoms/icon'

import './style.scss'

export const Empty: FC = () => {
	return (
		<div className='empty'>
			<div className='empty__content'>
				<Icon name='noData' />
				<p>Здесь еще нет данных...</p>
			</div>
		</div>
	)
}
