import { FC } from 'react'

import './style.scss'

interface ILoading {
	isFull?: boolean
}

export const Loader: FC<ILoading> = ({ isFull }) => {
	if (isFull) {
		return (
			<div className='loader-wrapper'>
				<div className='loader'>
					<i className='loader__dot' />
					<i className='loader__dot' />
					<i className='loader__dot' />
					<i className='loader__dot' />
					<i className='loader__dot' />
					<i className='loader__dot' />
					<i className='loader__dot' />
					<i className='loader__dot' />
				</div>
			</div>
		)
	}
	return (
		<div className='loader'>
			<i className='loader__dot' />
			<i className='loader__dot' />
			<i className='loader__dot' />
			<i className='loader__dot' />
			<i className='loader__dot' />
			<i className='loader__dot' />
			<i className='loader__dot' />
			<i className='loader__dot' />
		</div>
	)
}
