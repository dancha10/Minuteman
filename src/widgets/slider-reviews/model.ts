import { createStore, createEffect, createEvent, sample } from 'effector'

import { Types } from 'shared/lib'
import { getReviews } from 'shared/api'

export const getSliderReviews = createEvent()

export const sliderReviewsFx = createEffect<void, Types.ListReviewsType[], Error>(async () => await getReviews())

export const $userReviews = createStore<Types.ListReviewsType[]>([]).on(
	sliderReviewsFx.doneData,
	(_, reviews) => reviews
)

sample({
	clock: getSliderReviews,
	target: sliderReviewsFx,
})
