import { createEffect, createEvent, createStore, sample } from 'effector'
import { createForm } from 'effector-forms'
import * as yup from 'yup'

import { editReview } from 'shared/api'
import { setNotify } from 'entities/notification/model'
import { ActionBarModel } from 'features/action-bar'
import { createRule, Types } from 'shared/lib'
import { REQUIRED_MESSAGE } from 'shared/const'

import { getReviewsList } from './reviewsSort'

export type changeReviewType = {
	id: string
	text: string
}

export const reviewEditForm = createForm({
	fields: {
		review: {
			init: '',
			rules: [
				createRule({
					name: 'review',
					schema: yup.string().required(REQUIRED_MESSAGE),
				}),
			],
		},
	},
	validateOn: ['change', 'submit'],
})

export const toggledOpenModal = createEvent()
export const $isOpen = createStore(false).on(toggledOpenModal, prev => !prev)

export const getCurrentReview = createEvent<changeReviewType>()

sample({
	clock: getCurrentReview,
	fn: review => ({ review: review.text }),
	target: reviewEditForm.setForm,
})

sample({
	clock: getCurrentReview,
	target: toggledOpenModal,
})

export const changeReviewFx = createEffect<changeReviewType, Types.ListReviewsType, Error>(
	async ({ id, text }) => await editReview(id, text)
)

sample({
	clock: sample({
		clock: reviewEditForm.submit,
		source: reviewEditForm.$values,
		fn: text => text.review,
	}),
	source: getCurrentReview,
	fn: (source, text) => ({ id: source.id, text }),
	target: changeReviewFx,
})

sample({
	clock: changeReviewFx.doneData,
	fn: () => ({ type: 'success', title: 'Успешно', message: 'Отзыв успешно отредактирован' }),
	target: setNotify,
})

sample({
	clock: changeReviewFx.failData,
	fn: () => ({ type: 'error', title: 'Ошибка', message: 'Произошла ошибка :(' }),
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
