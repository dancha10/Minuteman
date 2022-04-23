import { createEvent, createStore, sample } from 'effector'

import { Types, userReviews } from 'shared/lib'

const filterDate = (prevDate: string, nextDate: string) => {
	if (new Date(prevDate) < new Date(nextDate)) return 1
	if (new Date(prevDate) > new Date(nextDate)) return -1
	return 0
}

const sortReviews = (filterStatus: string, comments: Types.IUserReview[]) => {
	return comments
		.sort((prev, next) => {
			if (prev.status === filterStatus && next.status === filterStatus) return 0
			if (prev.status === filterStatus && next.status !== filterStatus) {
				return -1
			}
			return 1
		})
		.sort((prevDate, nextDate) => {
			if (prevDate.status === filterStatus && nextDate.status === filterStatus) {
				return filterDate(prevDate.dateOfPost, nextDate.dateOfPost)
			}
			if (prevDate.status === filterStatus || nextDate.status === filterStatus) return 0
			return filterDate(prevDate.dateOfPost, nextDate.dateOfPost)
		})
}

export const changedFilterStatus = createEvent<string>()

export const $reviews = createStore<Types.IUserReview[]>(userReviews)
export const $sortReviews = $reviews.map(reviews => reviews).on(changedFilterStatus, review => [...review])

sample({
	clock: changedFilterStatus,
	source: $reviews,
	fn: (reviews, filter) => sortReviews(filter, reviews),
	target: $sortReviews,
})
