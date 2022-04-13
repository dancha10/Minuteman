import { FC, useRef } from 'react'
import { useStore } from 'effector-react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { SendingReview, SendingReviewModel } from 'features/sending-review'
import { UploadFile, UploadFileModel } from 'features/upload-file'
import { ToggleModal, ToggleModel } from 'features/toggle-modal'
import { useNotification } from 'entities/notification'
import { Modal } from 'shared/ui/atoms/modal'
import { Input } from 'shared/ui/atoms/input'
import { Textarea } from 'shared/ui/atoms/textarea'
import { FilePreview } from 'shared/ui/molecules/file-preview'
import { ReactComponent as Information } from 'widgets/review-modal/lib/info.svg'
import { ReactComponent as Cross } from 'widgets/review-modal/lib/cross.svg'
import { ReactComponent as Delete } from 'widgets/review-modal/lib/delete.svg'
import { detailedReviewValidator, fullNameValidator } from 'widgets/review-modal/lib/validator'

import 'widgets'

interface IReviewModalInputs {
	fullName: string
	detailedReview: string
}

export const ReviewModel: FC = () => {
	const isOpen = useStore(ToggleModel.$isOpen)
	const uploadedImage = useStore(UploadFileModel.$uploadImage)
	const fileName = useStore(UploadFileModel.$fileName)
	const errorMessage = useStore(UploadFileModel.$errorMessage)
	const percentLoading = useStore(UploadFileModel.$percentLoading)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IReviewModalInputs>()

	const notify = useNotification()

	const onSubmit: SubmitHandler<IReviewModalInputs> = data => {
		SendingReviewModel.sentReview({
			avatar: uploadedImage,
			fullName: data.fullName,
			review: data.detailedReview,
			dateOfPost: SendingReviewModel.localeDateString(),
		})
		ToggleModel.clickedButton()
		notify('success')
		deleteFile()
		reset()
	}

	const fileRef = useRef<HTMLInputElement>(null)

	const deleteFile = (): void => {
		UploadFileModel.resetStores()
		if (fileRef.current?.value) {
			fileRef.current.value = ''
		}
	}

	return (
		<Modal isOpen={isOpen} toggleOpen={ToggleModel.clickedButton}>
			<div className='review-model'>
				<div className='review-model__header'>
					<h4>Отзыв</h4>
					<ToggleModal />
				</div>
				<form className='review-model__form' onSubmit={handleSubmit(onSubmit)}>
					<p className='review-model__label'>Как вас зовут?</p>
					<div className='review-model__form-field'>
						<Input.Simple
							placeholder='Имя Фамилия'
							validation={{ ...register('fullName', fullNameValidator) }}
							isError={!!errors.fullName}
						/>
						<UploadFile fileRef={fileRef} />
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
					<div className='review-model__submit'>
						<SendingReview />
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
