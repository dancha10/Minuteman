import { createEffect, createEvent, createStore, restore, sample } from 'effector'

import { Types } from 'shared/lib'
import { createReviews, getCaptcha, updatePhoto } from 'shared/api'
import { NotificationModel } from 'entities/notification'
import { ToggleModel } from 'features/toggle-modal'
import { clickedButton } from 'features/toggle-modal/model'

export const resetCaptcha = createEvent()

export const resetCaptchaFx = createEffect<void, Types.CaptchaType, Error>(async () => await getCaptcha())

sample({
	clock: resetCaptcha,
	target: resetCaptchaFx,
})

export const $captcha = restore<Types.CaptchaType>(resetCaptchaFx.doneData, {
	base64Image: '',
	key: '',
})

interface CreatedReviewType {
	authorName: string
	title: string
	text: string
	captchaKey: string
	captchaValue: string
}

export const createdReview = createEvent<CreatedReviewType>()

export const createReviewFx = createEffect<CreatedReviewType, Types.ListReviewsType, Error>(
	async ({ authorName, title, text, captchaKey, captchaValue }) =>
		await createReviews(authorName, title, text, captchaKey, captchaValue)
)

sample({
	clock: createdReview,
	target: createReviewFx,
})

export const uploadPhoto = createEvent<FormData>()

export const uploadPhotoFx = createEffect<Types.UploadType, any, Error>(
	async ({ authorImage, id }) => await updatePhoto(id, authorImage)
)

sample({
	clock: createReviewFx.doneData,
	source: uploadPhoto,
	fn: (payload, review) => ({ authorImage: payload, id: review.id }),
	target: uploadPhotoFx,
})

sample({
	clock: [createReviewFx.doneData, uploadPhotoFx.doneData],
	fn: () => ({ type: 'success', title: 'Успешно!', message: 'Спасибо за отзыв о нашей компании :)' }),
	target: NotificationModel.setNotify,
})

sample({
	clock: [createReviewFx.failData, uploadPhotoFx.failData],
	fn: fail => ({
		type: 'error',
		title: 'Что-то не так...',
		message: fail.message,
	}),
	target: NotificationModel.setNotify,
})

sample({
	clock: createReviewFx.doneData,
	source: uploadPhoto,
	filter: photo => !photo,
	target: clickedButton,
})

sample({
	clock: uploadPhotoFx.doneData,
	target: clickedButton,
})

createReviewFx.doneData.watch(el => console.log(el))
