import { createEffect, createEvent, sample } from 'effector'

import { Types } from 'shared/lib'
import { updateStatus } from 'shared/api'
import { setNotify } from 'entities/notification/model'

type ChangeStatusType = {
	id: string
	status: Types.ListReviewsType['status']
}

export const changedStatusReview = createEvent<ChangeStatusType>()
export const changeStatusFx = createEffect<ChangeStatusType, Types.ListReviewsType, Error>(
	async ({ id, status }) => await updateStatus(id, status)
)

sample({
	clock: changedStatusReview,
	target: changeStatusFx,
})

sample({
	clock: changeStatusFx.doneData,
	fn: () => ({ type: 'success', title: 'Успешно', message: 'Статус отзыва успешно изменен' }),
	target: setNotify,
})

sample({
	clock: changeStatusFx.failData,
	fn: () => ({ type: 'error', title: 'Что-то не так!', message: 'Произошла какая-то ошибка. Попробуйте еще раз' }),
	target: setNotify,
})
