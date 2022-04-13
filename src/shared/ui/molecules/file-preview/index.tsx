import { FC, ReactNode } from 'react'
import classList from 'classnames'

import { Loader } from 'shared/ui/atoms/loader'

import { ReactComponent as File } from './file.svg'

import './style.scss'

interface IFilePreview {
	fileName: string
	percent: number
	error?: string
	action: ReactNode
}

export const FilePreview: FC<IFilePreview> = ({ fileName, percent, error, action }) => {
	return (
		<div className='file-preview'>
			<div className='file-preview__container'>
				<File />
				<div className='file-preview__body'>
					<p
						className={classList('file-preview__file-name', {
							'file-preview__error-message': error,
						})}
					>
						{error || fileName.split('.')[0]}
					</p>
					<div className='file-preview__progress-bar'>
						<progress max={100} value={percent} />
						<div className='file-preview__progress-bg'>
							<div
								className={classList('file-preview__progress-line', {
									'file-preview__progress-line--error': error,
								})}
							/>
						</div>
					</div>
				</div>
				{percent !== 100 && !error ? <Loader /> : action}
			</div>
		</div>
	)
}
