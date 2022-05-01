import { FC } from 'react'

import { ILoading } from 'shared/ui/atoms/loader'

import './style.scss'

export const CubeLoader: FC<ILoading> = ({ isFull = false }) => {
	return (
		<div className='cube-loader' data-is-full={isFull}>
			<div className='cube-loader__wrapper'>
				<i className='cube-loader__cube cube-loader__cube--bright'>&nbsp;</i>
				<i className='cube-loader__cube cube-loader__cube--dim'>&nbsp;</i>
				<i className='cube-loader__cube cube-loader__cube--transparent'>&nbsp;</i>
			</div>
		</div>
	)
}
