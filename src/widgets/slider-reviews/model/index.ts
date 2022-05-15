import { createStore, createEffect, createEvent, sample } from 'effector'

import { Types } from 'shared/lib'
import { getReviews } from 'shared/api'

export const getSliderReviews = createEvent()

export const sliderReviewsFx = createEffect<void, Types.ListReviewsType[], Error>(async () => await getReviews())

export const $userReviews = createStore<Types.ListReviewsType[]>([])

sample({
	clock: getSliderReviews,
	target: sliderReviewsFx,
})

sample({
	clock: sliderReviewsFx.doneData,
	fn: reviews => reviews.filter(review => review.status === 'approved'),
	target: $userReviews,
})
