import { FC } from 'react'

import { Avatar, IAvatar } from 'shared/ui/atoms/avatar'

import './style.scss'

interface IUserViewer extends IAvatar {
	fullName: string
	isMobileWidth?: boolean
}

export const UserViewer: FC<IUserViewer> = ({ fullName, image, isMobileWidth }) => {
	return (
		<div className='user-viewer'>
			<Avatar image={image} />
			<h4 className='user-viewer__fullName'>{isMobileWidth ? fullName.split(' ')[0] : fullName}</h4>
		</div>
	)
}
