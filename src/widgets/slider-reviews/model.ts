import { createStore } from 'effector'

import { SendingReviewModel } from 'features/sending-review'
import { Types } from 'shared/lib'
import { userReviews } from 'widgets/slider-reviews/lib/mocha'

export const $userReviews = createStore<Array<Types.IUserReview>>(userReviews).on(
	SendingReviewModel.sentReview,
	(reviews, newPost) => [...reviews, newPost]
)

$userReviews.watch(el => console.log(el))
