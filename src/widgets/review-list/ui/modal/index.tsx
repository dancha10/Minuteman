import { FC, FormEvent } from 'react'
import { useStore } from 'effector-react'
import { useForm } from 'effector-forms'

import { Modal } from 'shared/ui/atoms/modal'
import { ToggleModal } from 'features/toggle-modal'
import { Textarea } from 'shared/ui/atoms/textarea'
import { Button } from 'shared/ui/atoms/button'
import { CubeLoader } from 'shared/ui/atoms/cube-loader'

import { $isOpen, changeReviewFx, reviewEditForm, toggledOpenModal } from '../../model/review-modal'

import './style.scss'

export const ReviewEditModal: FC = () => {
	const isOpen = useStore($isOpen)

	const { fields, submit, hasError } = useForm(reviewEditForm)

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		submit()
	}
	const isLoading = useStore(changeReviewFx.pending)

	return (
		<Modal isOpen={isOpen} toggleOpen={toggledOpenModal}>
			{isLoading && <CubeLoader isWindow />}
			<div className='review-edit'>
				<div className='review-edit__header'>
					<h4>Отзыв</h4>
					<ToggleModal toggle={toggledOpenModal} />
				</div>
				<form className='review-edit__container' onSubmit={onSubmit}>
					<Textarea
						maxLength={200}
						label='Отзыв'
						placeholder='Edit'
						isError={hasError('review')}
						onChange={fields.review.onChange}
						value={fields.review.value}
					/>
					<div className='review-edit__area-button'>
						<Button.Dark type='submit' disabled={hasError('review')}>
							Подтвердить редактирование
						</Button.Dark>
						<Button.Dark color='red' type='button' onClickHandler={toggledOpenModal}>
							Отмена
						</Button.Dark>
					</div>
				</form>
			</div>
		</Modal>
	)
}
