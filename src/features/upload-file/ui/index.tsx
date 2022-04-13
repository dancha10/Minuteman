import { FC, RefObject } from 'react'

import { Button } from 'shared/ui/atoms/button'

import { imageReader, resetStores } from '../model'

import './style.scss'

interface IUploadFile {
	fileRef: RefObject<HTMLInputElement>
}

export const UploadFile: FC<IUploadFile> = ({ fileRef }) => {
	const clickButton = () => {
		fileRef?.current?.click()
		resetStores()
	}
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
			<Button.Dark onClickHandler={clickButton} addition>
				Загрузить фото
			</Button.Dark>
		</label>
	)
}
