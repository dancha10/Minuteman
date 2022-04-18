import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { ArrowSlider } from 'shared/ui/atoms/arrow'
import { SCREENS } from 'shared/lib'

import './style.scss'

interface IFormWrapper {
	title: string
	canGoBack?: boolean
}

export const FormWrapper: FC<IFormWrapper> = ({ title, children, canGoBack = false }) => {
	const navigate = useNavigate()
	const goBack = () => navigate(SCREENS.LOGIN)

	return (
		<div className='form-wrapper'>
			<div className='form-wrapper__header'>
				{canGoBack && (
					<div className='form-wrapper__redirect'>
						<ArrowSlider onClick={goBack} classname='form-wrapper__back' rotate={180} />
					</div>
				)}
				<div className='form-wrapper__title'>
					<h3>{title}</h3>
				</div>
			</div>
			<div className='form-wrapper__content'>{children}</div>
		</div>
	)
}
