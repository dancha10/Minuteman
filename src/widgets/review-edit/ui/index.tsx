import { FC } from 'react'
import { useStore } from 'effector-react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useNotification } from 'entities/notification'
import { Modal } from 'shared/ui/atoms/modal'
import { ToggleModal } from 'features/toggle-modal'
import { Textarea } from 'shared/ui/atoms/textarea'
import { Button } from 'shared/ui/atoms/button'

import { $currentReview, $isOpen, toggledOpenModal } from '../model/model'

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
	const notify = useNotification()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IReviewEditModal>({ mode: 'onChange' })

	const onSubmit: SubmitHandler<IReviewEditModal> = data => {
		console.log(data.review)
		notify('success', 'Отзыв изменен', 'Отзыв успешно отредактирован!')
		toggle()
	}

	return (
		<Modal isOpen={isOpen} toggleOpen={() => toggledOpenModal()}>
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
						value={currentReview}
						validation={{ ...register('review') }}
					/>
				</form>
				<div className='review-edit__area-button'>
					<Button.Dark type='submit'>Подтвердить редактирование</Button.Dark>
					<Button.Dark color='red' type='button' onClickHandler={toggle}>
						Отмена
					</Button.Dark>
				</div>
			</div>
		</Modal>
	)
}
