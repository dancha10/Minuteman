import { FC } from 'react'
import classNames from 'classnames'

import { ReactComponent as LogoSvg } from './logo.svg'

import './style.scss'

interface ILogo {
	color?: 'white' | 'purple'
}

export const Logo: FC<ILogo> = ({ color }) => {
	return (
		<a
			href='https://ilink.dev/promo/academy.html'
			target='_blank'
			className={classNames('header__logo', { [`${color}`]: color })}
			rel='noreferrer'
		>
			<LogoSvg />
		</a>
	)
}
