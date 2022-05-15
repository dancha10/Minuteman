import { FC, HTMLProps, SVGAttributes } from 'react'

import { iconList, IconName } from './icon-list'

import './style.scss'

interface IconType extends HTMLProps<HTMLBaseElement> {
	name: IconName
	className?: string
}

export const Icon: FC<IconType> = ({ name, className }) => {
	const IconComponent: FC<SVGAttributes<SVGElement>> | null = iconList[name] || null

	return (
		<div className='icons'>
			<IconComponent className={className} />
		</div>
	)
}
