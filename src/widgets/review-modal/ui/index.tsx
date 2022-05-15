import React, { FC, FormEvent, useEffect, useRef } from 'react'
import { useStore } from 'effector-react'
import { useForm } from 'effector-forms'

import { UploadFile, UploadFileModel } from 'features/upload-file'
import { ToggleModal, ToggleModel } from 'features/toggle-modal'
import { Modal } from 'shared/ui/atoms/modal'
import { Input } from 'shared/ui/atoms/input'
import { CubeLoader } from 'shared/ui/atoms/cube-loader'
import { Textarea } from 'shared/ui/atoms/textarea'
import { FilePreview } from 'shared/ui/molecules/file-preview'
import { Button } from 'shared/ui/atoms/button'
import { Icon } from 'shared/ui/atoms/icon'

import { $captcha, updateCaptcha, resetCaptchaFx, reviewForm } from '../model'

import './style.scss'

export const ReviewModal: FC = () => {
	const isOpen = useStore(ToggleModel.$isOpen)
	const fileName = useStore(UploadFileModel.$fileName)
	const errorMessage = useStore(UploadFileModel.$errorMessage)
	const percentLoading = useStore(UploadFileModel.$percentLoading)
	const captcha = useStore($captcha)
	const isLoadingCaptcha = useStore(resetCaptchaFx.pending)

	const { fields, submit, hasError } = useForm(reviewForm)

	const fileRef = useRef<HTMLInputElement>(null)

	const reloadCaptcha = () => {
		updateCaptcha()
	}

	useEffect(() => {
		reloadCaptcha()
	}, [])

	const deleteFile = (): void => {
		UploadFileModel.resetStores()
		fields.avatar.reset()
	}

	const clickButton = (): void => {
		fileRef?.current?.click()
	}

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		submit()
	}

	return (
		<Modal isOpen={isOpen} toggleOpen={ToggleModel.clickedButton}>
			<div className='review-model'>
				<div className='review-model__header'>
					<h4>Отзыв</h4>
					<ToggleModal toggle={ToggleModel.clickedButton} />
				</div>
				<form className='review-model__form' onSubmit={onSubmit}>
					<p className='review-model__label'>Как вас зовут?</p>
					<div className='review-model__form-field'>
						<Input.Simple
							placeholder='Имя Фамилия'
							onChange={fields.fullName.onChange}
							value={fields.fullName.value}
							isError={hasError('fullName')}
						/>
						<UploadFile fileRef={fileRef} onChangeFile={fields.avatar.onChange}>
							<Button.Dark type='button' onClickHandler={clickButton} addition>
								Загрузить фото
							</Button.Dark>
						</UploadFile>
						{hasError('fullName') && (
							<div className='review-model__error-message'>
								<Icon name='plus' width={10} height={10} />
								<span>{fields.fullName?.errors[0]?.errorText}</span>
							</div>
						)}
					</div>
					{(errorMessage || fileName) && (
						<div className='review-model__file-preview'>
							<FilePreview
								fileName={fileName}
								percent={percentLoading}
								error={errorMessage}
								action={
									<button className='review-model__delete' onClick={deleteFile}>
										<Icon name='trash' />
									</button>
								}
							/>
						</div>
					)}
					<div className='review-model__textarea'>
						<p className='review-model__label'>Все ли вам понравилось?</p>
						<Textarea
							placeholder='Напишите пару слов о вашем опыте...'
							maxLength={200}
							onChange={fields.review.onChange}
							value={fields.review.value}
							isError={hasError('review')}
						/>
						{hasError('review') && (
							<div className='review-model__error-message'>
								<Icon name='plus' width={10} height={10} />
								<span>{fields.review?.errors[0]?.errorText}</span>
							</div>
						)}
					</div>
					<div className='review-model__footer'>
						<p className='review-model__label'>Введите код с картинки: </p>
						<div className='review-model__captcha-area'>
							<Input.Simple
								placeholder='0000'
								isError={hasError('captcha')}
								onChange={fields.captcha.onChange}
								value={fields.captcha.value}
							/>
							<div className='review-model__captcha'>
								{isLoadingCaptcha ? (
									<div className='review-model__captcha-loading'>
										<CubeLoader />
									</div>
								) : (
									<img src={captcha?.base64Image} alt='captcha' />
								)}
							</div>
							<button type='button' onClick={reloadCaptcha} className='review-model__reset-captcha'>
								<Icon name='reload' />
							</button>
						</div>
					</div>
					<div className='review-model__submit'>
						<Button.Dark type='submit'>Отправить отзыв</Button.Dark>
						<div className='review-model__information'>
							<Icon name='infoReview' />
							<span>Все отзывы проходят модерацию в течение 2 часов</span>
						</div>
					</div>
				</form>
			</div>
		</Modal>
	)
}
