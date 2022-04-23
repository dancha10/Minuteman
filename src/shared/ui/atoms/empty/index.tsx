import { FC } from 'react'

import { ReactComponent as Nodata } from './nodata.svg'

import './style.scss'

export const Empty: FC = () => {
	return (
		<div className='empty'>
			<div className='empty__content'>
				<Nodata />
				<p>Здесь еще нет данных...</p>
			</div>
		</div>
	)
}
