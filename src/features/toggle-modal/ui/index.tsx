import { FC } from 'react'

import { ReactComponent as Close } from '../lib/close.svg'

import './style.scss'

interface IToggleModal {
	toggle: () => void
}

export const ToggleModal: FC<IToggleModal> = ({ toggle }) => {
	return (
		<button className='toggle-modal' onClick={toggle}>
			<Close />
		</button>
	)
}
