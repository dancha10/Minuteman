import { createEffect, createEvent, restore, sample } from 'effector'

import { getReviews } from 'shared/api'
import { Types } from 'shared/lib'

const filterDate = (prevDate: string, nextDate: string) => {
	if (new Date(prevDate) < new Date(nextDate)) return 1
	if (new Date(prevDate) > new Date(nextDate)) return -1
	return 0
}

const sortReviews = (filterStatus: string, comments: Types.ListReviewsType[]) => {
	return [
		...comments
			.sort((prev, next) => {
				if (prev.status === filterStatus && next.status === filterStatus) return 0
				if (prev.status === filterStatus && next.status !== filterStatus) {
					return -1
				}
				return 1
			})
			.sort((prevDate, nextDate) => {
				if (prevDate.status === filterStatus && nextDate.status === filterStatus) {
					return filterDate(prevDate.createdAt, nextDate.createdAt)
				}
				if (prevDate.status === filterStatus || nextDate.status === filterStatus) return 0
				return filterDate(prevDate.createdAt, nextDate.createdAt)
			}),
	]
}

export const changedFilterStatus = createEvent<string>()

export const getReviewsList = createEvent()

export const reviewsFx = createEffect<void, Types.ListReviewsType[], Error>(async () => await getReviews())

sample({
	clock: getReviewsList,
	target: reviewsFx,
})

export const $reviews = restore<Types.ListReviewsType[]>(reviewsFx.doneData, [])
export const $sortReviews = $reviews.map(reviews => reviews)

sample({
	clock: changedFilterStatus,
	source: $reviews,
	fn: (reviews, filter) => sortReviews(filter, reviews),
	target: $sortReviews,
})

sample({
	clock: reviewsFx.doneData,
	fn: () => 'onCheck',
	target: changedFilterStatus,
})
