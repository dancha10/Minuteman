import { FC } from 'react'

import { Icon } from 'shared/ui/atoms/icon'

import './style.scss'

interface IToggleModal {
	toggle: () => void
}

export const ToggleModal: FC<IToggleModal> = ({ toggle }) => {
	return (
		<button className='toggle-modal' onClick={toggle}>
			<Icon name='close' />
		</button>
	)
}
