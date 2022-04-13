import { FC } from 'react'

import { ReactComponent as Close } from '../lib/close.svg'
import { clickedButton } from '../model'

import './style.scss'

export const ToggleModal: FC = () => {
	return (
		<button className='toggle-modal' onClick={() => clickedButton()}>
			<Close />
		</button>
	)
}
