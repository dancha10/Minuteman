import { createEffect, createEvent, restore, sample } from 'effector'

import { Types } from 'shared/lib'
import { getMyProfile, updateProfile, updateSelfPhoto } from 'shared/api'
import { NotificationModel } from 'entities/notification'
import { UploadFileModel } from 'features/upload-file'
import { ErrorModel } from 'entities/error'

export interface IProfileInputFields {
	firstName: string
	lastName: string
	profileImage: string
	birthDate: string
	gender: { value: 'male' | 'female'; label: string }
	cityOfResidence: { value: string; label: string }
	hasPet: { value: boolean; label: string }
	aboutMe: string
	smallAboutMe: string | null
}

export const getProfileData = createEvent()

export const profileDataFx = createEffect<void, Types.MyProfileType, Error>(async () => await getMyProfile())

export const $profileData = restore<Types.MyProfileType>(profileDataFx.doneData, {
	firstName: '',
	lastName: '',
	profileImage: '',
	birthDate: '',
	gender: 'male',
	cityOfResidence: '',
	favoriteFood: '',
	hasPet: false,
	petType: '',
	petName: '',
	aboutMe: '',
	smallAboutMe: '',
	academyStatus: 'studies',
})

sample({
	clock: getProfileData,
	target: profileDataFx,
})

export const updateFields = createEvent<IProfileInputFields>()
export const updateMyProfileFx = createEffect<IProfileInputFields, Types.MyProfileType, Error>(
	async ({ firstName, lastName, birthDate, cityOfResidence, gender, hasPet, smallAboutMe, aboutMe }) =>
		await updateProfile(
			firstName,
			lastName,
			birthDate,
			cityOfResidence.value,
			gender.value,
			hasPet.value,
			smallAboutMe,
			aboutMe
		)
)

sample({
	clock: updateFields,
	target: updateMyProfileFx,
})

sample({
	clock: updateMyProfileFx.doneData,
	fn: () => ({ type: 'success', title: 'Успешно', message: 'Профиль успешно изменен' }),
	target: NotificationModel.setNotify,
})

sample({
	clock: updateMyProfileFx.failData,
	fn: () => ({ type: 'error', title: 'Что-то не так!', message: 'Произошла какая-то ошибка. Попробуйте еще раз' }),
	target: NotificationModel.setNotify,
})

export const updatedProfilePhoto = createEvent<FormData>()
export const updateProfilePhotoFx = createEffect<FormData, any, Error>(async profileImage =>
	updateSelfPhoto(profileImage)
)

sample({
	clock: updatedProfilePhoto,
	target: updateProfilePhotoFx,
})

sample({
	clock: updateProfilePhotoFx.doneData,
	fn: () => ({ type: 'success', title: 'Успешно', message: 'Фото успешно загружено' }),
	target: NotificationModel.setNotify,
})

sample({
	clock: updateProfilePhotoFx.failData,
	fn: () => 'Произошла какая-то ошибка. Попробуйте еще раз',
	target: ErrorModel.setError,
})

sample({
	clock: [updateMyProfileFx.doneData, updateProfilePhotoFx.doneData],
	target: getProfileData,
})
