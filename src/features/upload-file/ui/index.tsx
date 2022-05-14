import { ChangeEvent, FC, RefObject } from 'react'

import { imageReader } from '../model'

import './style.scss'

interface IUploadFile {
	fileRef?: RefObject<HTMLInputElement>
	value?: string
	onChangeFile: (file: any) => void
}

export const UploadFile: FC<IUploadFile> = ({ fileRef, value, onChangeFile, children }) => {
	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		imageReader(event.target.files)
		onChangeFile(event.target.files)
	}
	return (
		<label htmlFor='file' className='file-upload' title='Загрузить изображение'>
			<input
				type='file'
				name='avatar-upload'
				id='file'
				ref={fileRef}
				accept='.png, .jpg, .jpeg'
				onChange={onChange}
				value={value}
			/>
			{children}
		</label>
	)
}
