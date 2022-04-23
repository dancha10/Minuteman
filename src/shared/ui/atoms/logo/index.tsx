import { FC } from 'react'
import classNames from 'classnames'

import { ReactComponent as LogoSvg } from './logo.svg'

import './style.scss'

interface ILogo {
	color?: 'white' | 'purple'
}

export const Logo: FC<ILogo> = ({ color }) => {
	return (
		<div className={classNames('header__logo', { [`${color}`]: color })}>
			<LogoSvg />
		</div>
	)
}
