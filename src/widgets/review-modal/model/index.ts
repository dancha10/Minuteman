import { createEffect, createEvent, restore, sample } from 'effector'
import { createForm } from 'effector-forms'
import * as yup from 'yup'

import { createRule, fullNameRegex, Types } from 'shared/lib'
import { createReviews, getCaptcha, updatePhoto } from 'shared/api'
import { NotificationModel } from 'entities/notification'
import { ToggleModel } from 'features/toggle-modal'
import { clickedButton } from 'features/toggle-modal/model'
import { REQUIRED_MESSAGE } from 'shared/const'
import { UploadFileModel } from 'features/upload-file'

interface CreatedReviewType {
	authorName: string
	title: string
	text: string
	captchaKey: string
	captchaValue: string
}

export const reviewForm = createForm({
	fields: {
		fullName: {
			init: '',
			rules: [
				createRule({
					name: 'fullName',
					schema: yup
						.string()
						.max(35, 'Махимальная длина фамилии и имени 35 символов')
						.matches(fullNameRegex, 'Введите имя и фамилию русскими буквами')
						.required(REQUIRED_MESSAGE),
				}),
			],
		},
		review: {
			init: '',
			rules: [
				createRule({
					name: 'review',
					schema: yup.string().min(3, 'Минимальная длина отзыва 3 символа').required(REQUIRED_MESSAGE),
				}),
			],
		},
		captcha: {
			init: '',
			rules: [
				createRule<string>({
					name: 'captcha',
					schema: yup.string().required(REQUIRED_MESSAGE),
				}),
			],
		},
		avatar: {
			init: {} as FileList,
			rules: [
				createRule<FileList>({
					name: 'avatar',
					schema: yup
						.mixed()
						.test({
							message: 'Размер файла не должен превышать 5мб',
							test: (file: FileList) => file[0].size < 1024 * 1024 * 5,
						})
						.test({
							message: 'Доступные форматы изображений jpeg и png.',
							test: (file: FileList) => /\.(jpe?g|png)$/i.test(file[0]?.name),
						}),
				}),
			],
		},
	},
	validateOn: ['change', 'submit'],
})

export const updateCaptcha = createEvent()
export const resetCaptchaFx = createEffect<void, Types.CaptchaType, Error>(async () => await getCaptcha())

sample({
	clock: updateCaptcha,
	target: resetCaptchaFx,
})

export const $captcha = restore<Types.CaptchaType>(resetCaptchaFx.doneData, {
	base64Image: '',
	key: '',
})

export const createReviewFx = createEffect<CreatedReviewType, Types.ListReviewsType, Error>(
	async ({ authorName, title, text, captchaKey, captchaValue }) =>
		await createReviews(authorName, title, text, captchaKey, captchaValue)
)

sample({
	clock: reviewForm.submit,
	source: sample({
		clock: reviewForm.$values,
		source: $captcha,
		fn: (captcha, review) => ({
			authorName: review.fullName,
			text: review.review,
			title: 'title',
			captchaValue: review.captcha,
			captchaKey: captcha.key,
		}),
	}),
	target: createReviewFx,
})

export const uploadPhotoFx = createEffect<Types.UploadType, Types.MyProfileType, Error>(async ({ authorImage, id }) => {
	const formData = new FormData()
	formData.append('authorImage', authorImage[0])
	return await updatePhoto(id, formData)
})

sample({
	clock: createReviewFx.doneData,
	source: reviewForm.fields.avatar.$value,
	filter: avatar => Object.keys(avatar).length !== 0,
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
	fn: fail => {
		return fail.message.indexOf('captcha') !== -1
			? {
					type: 'error',
					title: 'Ошибка...',
					message: 'Неправильно введена капча!',
			  }
			: {
					type: 'error',
					title: 'Что-то не так...',
					message: 'Произошла ошибка!',
			  }
	},
	target: NotificationModel.setNotify,
})

sample({
	clock: createReviewFx.failData,
	filter: fail => fail.message.indexOf('captcha') !== -1,
	fn: () => ({
		rule: 'my-custom',
		errorText: 'Неправильная капча',
	}),
	target: reviewForm.fields.captcha.addError,
})

sample({
	clock: createReviewFx.failData,
	filter: fail => fail.message.indexOf('captcha') !== -1,
	target: updateCaptcha,
})

sample({
	clock: createReviewFx.doneData,
	source: reviewForm.fields.avatar.$value,
	filter: avatar => Object.keys(avatar).length === 0,
	target: clickedButton,
})

sample({
	clock: uploadPhotoFx.doneData,
	target: clickedButton,
})

sample({
	clock: ToggleModel.$isOpen,
	filter: Boolean,
	target: reviewForm.reset,
})

sample({
	clock: reviewForm.reset,
	target: UploadFileModel.resetStores,
})
