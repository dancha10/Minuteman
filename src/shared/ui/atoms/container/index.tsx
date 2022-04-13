import { FC } from 'react'

import './style.scss'

export const Container: FC = ({ children }) => {
	return <div className='container'>{children}</div>
}
