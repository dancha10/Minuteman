import { FC } from 'react'
import classNames from 'classnames'

import { Button } from 'shared/ui/atoms/button'
import { IUserComment, UserComment } from 'shared/ui/molecules/user-comment'

import { ReactComponent as Edit } from '../lib/edit.svg'
import { ReactComponent as Check } from '../lib/check.svg'
import { ReactComponent as Cross } from '../lib/cross.svg'

import './style.scss'

interface ICommentPanel extends IUserComment {
	status: string
	handlerModal: (reviewText: string) => void
}

export const ControlComments: FC<ICommentPanel> = ({ name, review, dateOfPost, image, status, handlerModal }) => {
	const handler = () => {
		handlerModal(review)
	}
	return (
		<div
			className={classNames(
				'control-comment',
				{ 'control-comment--published': status === 'published' },
				{ 'control-comment--reject': status === 'rejected' }
			)}
		>
			<UserComment review={review} name={name} dateOfPost={dateOfPost} image={image} />
			<div className='control-comment__action-bar'>
				{status !== 'published' && status !== 'rejected' ? (
					<>
						<div className='control-comment__control-button'>
							<Button.Dark type='button' color='primary'>
								Опубликовать
							</Button.Dark>
							<Button.Dark type='button' color='red'>
								Отклонить
							</Button.Dark>
						</div>
						<div className='control-comment__edit'>
							<Button.Dark color='primary' type='button' onClickHandler={handler}>
								<Edit />
							</Button.Dark>
						</div>
					</>
				) : status === 'published' ? (
					<div className='control-comment__feedback control-comment__feedback--published'>
						<Check />
						<p>Отзыв опубликован</p>
					</div>
				) : (
					<div className='control-comment__feedback control-comment__feedback--reject'>
						<Cross />
						<p>Отзыв отклонен</p>
					</div>
				)}
			</div>
		</div>
	)
}
