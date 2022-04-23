import { FC, RefObject } from 'react'

import { imageReader } from '../model'

import './style.scss'

interface IUploadFile {
	fileRef: RefObject<HTMLInputElement>
}

export const UploadFile: FC<IUploadFile> = ({ fileRef, children }) => {
	return (
		<label htmlFor='file' className='file-upload' title='Загрузить изображение'>
			<input
				type='file'
				name='avatar-upload'
				id='file'
				ref={fileRef}
				accept='.png, .jpg, .jpeg'
				onChange={e => imageReader(e.target.files)}
			/>
			{children}
		</label>
	)
}
