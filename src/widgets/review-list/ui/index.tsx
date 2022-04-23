import { FC } from 'react'
import { useStore } from 'effector-react'

import { Empty } from 'shared/ui/atoms/empty'
import { ControlComments } from 'features/action-bar'
import { ReviewEditModel } from 'widgets/review-edit' // временно

import { $sortReviews } from '../model/reviewsSort'

import './style.scss'

export const ReviewList: FC = () => {
	const reviews = useStore($sortReviews)
	return (
		<div className='review-list'>
			{reviews ? (
				reviews.map(review => (
					<div className='review-list__item' key={review.fullName}>
						<ControlComments
							status={review.status}
							review={review.review}
							name={review.fullName}
							dateOfPost={review.dateOfPost}
							handlerModal={ReviewEditModel.getCurrentReview}
						/>
					</div>
				))
			) : (
				<Empty />
			)}
		</div>
	)
}
