import { FC, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

import './style.scss'

interface IError {
	isActive: boolean
}

export const Error: FC<IError> = ({ isActive = false, children }) => {
	const errorRef = useRef<HTMLDivElement>(null)
	return (
		<CSSTransition in={isActive} timeout={300} classNames='error-transition' unmountOnExit nodeRef={errorRef}>
			<div className='error' ref={errorRef}>
				{children}
			</div>
		</CSSTransition>
	)
}
