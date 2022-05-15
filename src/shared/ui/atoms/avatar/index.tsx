import { FC } from 'react'

import { Icon } from 'shared/ui/atoms/icon'

import './style.scss'

export interface IAvatar {
	image?: string | null
}

export const Avatar: FC<IAvatar> = ({ image }) => {
	return (
		<div className='avatar'>
			{image ? (
				<img src={image} alt='profile' />
			) : (
				<div className='avatar__camera'>
					<Icon name='camera' />
				</div>
			)}
		</div>
	)
}
