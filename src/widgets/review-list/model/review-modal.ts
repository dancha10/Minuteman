import { createEffect, createEvent, createStore, sample } from 'effector'

import { editReview } from 'shared/api'
import { setNotify } from 'entities/notification/model'
import { getReviewsList } from 'widgets/review-list/model/reviewsSort'
import { ActionBarModel } from 'features/action-bar'
import { Types } from 'shared/lib'

export type changeReviewType = {
	id: string
	text: string
}

export const toggledOpenModal = createEvent()
export const $isOpen = createStore(false).on(toggledOpenModal, (prev, _) => !prev)

export const getCurrentReview = createEvent<changeReviewType>()
export const $currentReview = createStore<changeReviewType>({
	id: '',
	text: '',
}).on(getCurrentReview, (_, review) => review)

sample({
	clock: getCurrentReview,
	target: toggledOpenModal,
})

export const editedReview = createEvent<string>()
export const changeReviewFx = createEffect<changeReviewType, Types.ListReviewsType, Error>(
	async ({ id, text }) => await editReview(id, text)
)

sample({
	clock: editedReview,
	source: getCurrentReview,
	fn: (source, clock) => ({ id: source.id, text: clock }),
	target: changeReviewFx,
})

sample({
	clock: changeReviewFx.doneData,
	fn: () => ({ type: 'success', title: 'Успешно', message: 'Отзыв успешно отредактирован' }),
	target: setNotify,
})

sample({
	clock: changeReviewFx.doneData,
	target: toggledOpenModal,
})

sample({
	clock: [changeReviewFx.doneData, ActionBarModel.changeStatusFx.doneData],
	target: getReviewsList,
})
