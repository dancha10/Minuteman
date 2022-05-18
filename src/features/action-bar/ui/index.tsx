import { FC } from 'react'
import classNames from 'classnames'

import { Button } from 'shared/ui/atoms/button'
import { IUserComment, UserComment } from 'shared/ui/molecules/user-comment'
import { changedStatusReview } from 'features/action-bar/model'
import { Icon } from 'shared/ui/atoms/icon'

import './style.scss'

interface ICommentPanel extends IUserComment {
	status: string
	handlerModal: ({ id, text }: { id: string; text: string }) => void
	reviewID: string
}

export const ControlComments: FC<ICommentPanel> = ({
	name,
	review,
	dateOfPost,
	image,
	status,
	handlerModal,
	reviewID,
}) => {
	const handler = () => {
		handlerModal({ id: reviewID, text: review })
	}

	const approveReview = () => {
		changedStatusReview({ id: reviewID, status: 'approved' })
	}

	const rejectReview = () => {
		changedStatusReview({ id: reviewID, status: 'declined' })
	}

	return (
		<div
			className={classNames(
				'control-comment',
				{ 'control-comment--published': status === 'approved' },
				{ 'control-comment--reject': status === 'declined' }
			)}
		>
			<UserComment review={review} name={name} dateOfPost={dateOfPost} image={image} />
			<div className='control-comment__action-bar'>
				{status !== 'approved' && status !== 'declined' ? (
					<>
						<div className='control-comment__control-button'>
							<Button.Dark type='button' color='primary' onClickHandler={approveReview}>
								Опубликовать
							</Button.Dark>
							<Button.Dark type='button' color='red' onClickHandler={rejectReview}>
								Отклонить
							</Button.Dark>
						</div>
						<div className='control-comment__edit'>
							<Button.Dark color='primary' type='button' onClickHandler={handler}>
								<Icon name='edit' className='control-comment__edit--btn' />
							</Button.Dark>
						</div>
					</>
				) : status === 'approved' ? (
					<div className='control-comment__feedback control-comment__feedback--published'>
						<Icon name='check' />
						<p>Отзыв опубликован</p>
					</div>
				) : (
					<div className='control-comment__feedback control-comment__feedback--reject'>
						<Icon name='reject' />
						<p>Отзыв отклонен</p>
					</div>
				)}
			</div>
		</div>
	)
}
