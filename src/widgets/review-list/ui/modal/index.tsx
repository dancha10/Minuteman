import { FC } from 'react'
import { useStore } from 'effector-react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Modal } from 'shared/ui/atoms/modal'
import { ToggleModal } from 'features/toggle-modal'
import { Textarea } from 'shared/ui/atoms/textarea'
import { Button } from 'shared/ui/atoms/button'
import { CubeLoader } from 'shared/ui/atoms/cube-loader'

import { $currentReview, $isOpen, changeReviewFx, editedReview, toggledOpenModal } from '../../model/review-modal'

import './style.scss'

interface IReviewEditModal {
	review: string
}

export const ReviewEditModal: FC = () => {
	const currentReview = useStore($currentReview)
	const isOpen = useStore($isOpen)

	const toggle = () => {
		toggledOpenModal()
		reset()
	}

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IReviewEditModal>({ mode: 'onChange' })

	const onSubmit: SubmitHandler<IReviewEditModal> = data => {
		editedReview(data.review)
	}

	const isLoading = useStore(changeReviewFx.pending)

	return (
		<Modal isOpen={isOpen} toggleOpen={toggledOpenModal}>
			{isLoading && <CubeLoader isWindow />}
			<div className='review-edit'>
				<div className='review-edit__header'>
					<h4>Отзыв</h4>
					<ToggleModal toggle={toggle} />
				</div>
				<form className='review-edit__container' onSubmit={handleSubmit(onSubmit)}>
					<Textarea
						maxLength={200}
						label='Отзыв'
						placeholder='Edit'
						isError={false}
						value={currentReview.text}
						validation={{ ...register('review') }}
					/>
					<div className='review-edit__area-button'>
						<Button.Dark type='submit'>Подтвердить редактирование</Button.Dark>
						<Button.Dark color='red' type='button' onClickHandler={toggle}>
							Отмена
						</Button.Dark>
					</div>
				</form>
			</div>
		</Modal>
	)
}
