import { FC } from 'react'

import { ReactComponent as Telegram } from './telegram.svg'
import { ReactComponent as Vk } from './vk.svg'
import { ReactComponent as Reddit } from './reddit.svg'

import './style.scss'

export const Footer: FC = () => {
	return (
		<footer className='footer'>
			<div className='footer__container container'>
				<div className='footer__copyright'>© iLINK ACADEMY. ALL RIGHTS RESERVED. 2022</div>
				<ul className='footer__social-media'>
					<li className='footer__link'>
						<a href='https://vk.com/dan_speeday' target='_blank' rel='noreferrer'>
							<Vk />
						</a>
					</li>
					<li className='footer__link'>
						<a href='https://github.com/dancha10' target='_blank' rel='noreferrer'>
							<Reddit />
						</a>
					</li>
					<li className='footer__link'>
						<a href='https://t.me/dancha_bruh' target='_blank' rel='noreferrer'>
							<Telegram />
						</a>
					</li>
				</ul>
			</div>
		</footer>
	)
}
