import { FC } from 'react'

import { ReactComponent as ProfileAvatar } from './camera.svg'

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
					<ProfileAvatar />
				</div>
			)}
		</div>
	)
}
