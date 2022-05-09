import { FC, useEffect } from 'react'
import { useStore } from 'effector-react'

import { Empty } from 'shared/ui/atoms/empty'
import { ControlComments } from 'features/action-bar'
import { ReviewEditModel } from 'widgets/review-edit' // временно
import { localeDateString } from 'shared/lib'
import { Skeleton } from 'shared/ui/atoms/skeleton'

import { $sortReviews, getReviewsList, reviewsFx } from '../model/reviewsSort'

import './style.scss'

export const ReviewList: FC = () => {
	useEffect(() => {
		getReviewsList()
	}, [])

	const isLoading = useStore(reviewsFx.pending)
	const reviews = useStore($sortReviews)

	return (
		<div className='review-list'>
			{reviews ? (
				isLoading ? (
					[...new Array(4)].map((_, index) => (
						<Skeleton
							isLoading={isLoading}
							height='363px'
							width='520px'
							key={index}
							className='review-list__item'
						/>
					))
				) : (
					reviews.map(review => (
						<div className='review-list__item' key={review.id}>
							<ControlComments
								status={review.status}
								review={review.text}
								name={review.authorName}
								dateOfPost={localeDateString(review.createdAt)}
								handlerModal={ReviewEditModel.getCurrentReview}
								image={review.authorImage ? `https://academtest.ilink.dev/images/${review.authorImage}` : null}
							/>
						</div>
					))
				)
			) : (
				<Empty />
			)}
		</div>
	)
}
