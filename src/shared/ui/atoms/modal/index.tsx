import { FC } from 'react'
import ReactDOM from 'react-dom'
import classList from 'classnames'

import './style.scss'

interface IModal {
	isOpen: boolean
	toggleOpen: () => void
}

export const Modal: FC<IModal> = ({ isOpen, toggleOpen, children }) => {
	return ReactDOM.createPortal(
		<div
			className={classList('modal', { 'modal--active': isOpen })}
			onClick={() => toggleOpen()}
			role='presentation'
		>
			<div
				className={classList('modal__container', {
					'modal__container--active': isOpen,
				})}
				onClick={e => e.stopPropagation()}
				role='presentation'
			>
				{children}
			</div>
		</div>,
		document.getElementById('modal')!
	)
}
