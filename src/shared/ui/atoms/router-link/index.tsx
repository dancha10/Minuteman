import { FC } from 'react'
import { Link } from 'react-router-dom'

import './style.scss'

interface IRouterLink {
	to: string
	classname?: string
}

export const RouterLink: FC<IRouterLink> = ({ to, classname, children }) => {
	return (
		<Link to={to} className={classname}>
			{children}
		</Link>
	)
}
