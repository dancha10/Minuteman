import { FC, useEffect, useRef } from 'react'
import { useStore } from 'effector-react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { UploadFile, UploadFileModel } from 'features/upload-file'
import { ToggleModal, ToggleModel } from 'features/toggle-modal'
import { Modal } from 'shared/ui/atoms/modal'
import { Input } from 'shared/ui/atoms/input'
import { CubeLoader } from 'shared/ui/atoms/cube-loader'
import { Textarea } from 'shared/ui/atoms/textarea'
import { FilePreview } from 'shared/ui/molecules/file-preview'
import { Button } from 'shared/ui/atoms/button'
import { resetStores } from 'features/upload-file/model'

import { ReactComponent as Information } from '../lib/info.svg'
import { ReactComponent as Cross } from '../lib/cross.svg'
import { ReactComponent as Delete } from '../lib/delete.svg'
import { ReactComponent as Reload } from '../lib/reload.svg'
import { detailedReviewValidator, fullNameValidator } from '../lib/validator'
import { $captcha, createdReview, resetCaptcha, resetCaptchaFx, uploadPhoto } from '../model'

import './style.scss'

interface IReviewModalInputs {
	fullName: string
	detailedReview: string
	captcha: string
}

export const ReviewModal: FC = () => {
	const isOpen = useStore(ToggleModel.$isOpen)
	const uploadedImage = useStore(UploadFileModel.$uploadImage)
	const fileName = useStore(UploadFileModel.$fileName)
	const errorMessage = useStore(UploadFileModel.$errorMessage)
	const percentLoading = useStore(UploadFileModel.$percentLoading)
	const captcha = useStore($captcha)
	const isLoadingCaptcha = useStore(resetCaptchaFx.pending)

	useEffect(() => {
		reloadCaptcha()
	}, [])

	const deleteFile = (): void => {
		UploadFileModel.resetStores()
		if (fileRef.current?.value) {
			fileRef.current.value = ''
		}
	}

	const clickButton = () => {
		fileRef?.current?.click()
		resetStores()
	}

	const reloadCaptcha = () => {
		resetCaptcha()
	}

	const fileRef = useRef<HTMLInputElement>(null)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IReviewModalInputs>()

	const onSubmit: SubmitHandler<IReviewModalInputs> = fields => {
		createdReview({
			authorName: fields.fullName,
			text: fields.detailedReview,
			title: 'title',
			captchaValue: fields.captcha,
			captchaKey: captcha.key,
		})

		if (uploadedImage) {
			const formData = new FormData()
			formData.set('authorImage', fileRef.current?.files?.[0]!)
			uploadPhoto(formData)
		}

		/* deleteFile() */
	}

	return (
		<Modal isOpen={isOpen} toggleOpen={ToggleModel.clickedButton}>
			<div className='review-model'>
				<div className='review-model__header'>
					<h4>Отзыв</h4>
					<ToggleModal toggle={ToggleModel.clickedButton} />
				</div>
				<form className='review-model__form' onSubmit={handleSubmit(onSubmit)}>
					<p className='review-model__label'>Как вас зовут?</p>
					<div className='review-model__form-field'>
						<Input.Simple
							placeholder='Имя Фамилия'
							validation={{ ...register('fullName', fullNameValidator) }}
							isError={!!errors.fullName}
						/>
						<UploadFile fileRef={fileRef}>
							<Button.Dark onClickHandler={clickButton} addition>
								Загрузить фото
							</Button.Dark>
						</UploadFile>
						{errors.fullName && (
							<div className='review-model__error-message'>
								<Cross width={10} height={10} />
								<span>{errors.fullName?.message}</span>
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
										<Delete />
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
							validation={{ ...register('detailedReview', detailedReviewValidator) }}
							isError={!!errors.detailedReview}
						/>
						{errors.detailedReview && (
							<div className='review-model__error-message'>
								<Cross width={10} height={10} />
								<span>{errors.detailedReview?.message}</span>
							</div>
						)}
					</div>
					<div className='review-model__footer'>
						<p className='review-model__label'>Введите код с картинки: </p>
						<div className='review-model__captcha-area'>
							<Input.Simple placeholder='0000' isError={false} validation={{ ...register('captcha') }} />
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
								<Reload />
							</button>
						</div>
					</div>
					<div className='review-model__submit'>
						<Button.Dark type='submit'>Отправить отзыв</Button.Dark>
						<div className='review-model__information'>
							<Information />
							<span>Все отзывы проходят модерацию в течение 2 часов</span>
						</div>
					</div>
				</form>
			</div>
		</Modal>
	)
}
