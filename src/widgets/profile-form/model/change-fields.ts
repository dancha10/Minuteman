import { createEffect, createEvent, createStore, sample } from 'effector'

import { getMyProfile, updateProfile, updateSelfPhoto } from 'shared/api'
import { localeDateString, Types } from 'shared/lib'
import { NotificationModel } from 'entities/notification'
import { ErrorModel } from 'entities/error'

import { myProfileForm } from './form'

interface IProfileInputFields {
	firstName: string
	lastName: string
	birthDate: string
	gender: { value: 'male' | 'female'; label: string }
	cityOfResidence: { value: string; label: string }
	hasPet: { value: boolean; label: string }
	aboutMe: string
	smallAboutMe: string | null
}

export const getProfileData = createEvent()
export const profileDataFx = createEffect<void, Types.MyProfileType, Error>(async () => await getMyProfile())

sample({
	clock: getProfileData,
	target: profileDataFx,
})

sample({
	clock: profileDataFx.doneData,
	fn: profile => ({
		firstName: profile.firstName,
		lastName: profile.lastName,
		birthDate: localeDateString(profile.birthDate),
		cityOfResidence: { value: profile.cityOfResidence, label: profile.cityOfResidence },
		gender: { value: profile.gender, label: profile.gender === 'male' ? 'Мужчина' : 'Женщина' },
		hasPet: { value: profile.hasPet, label: profile.hasPet ? 'Есть' : 'Нет' },
		smallAboutMe: profile.smallAboutMe ?? '',
		aboutMe: profile.aboutMe,
	}),
	target: myProfileForm.setForm,
})

export const $avatarURL = createStore<string | null>(null)

sample({
	clock: profileDataFx.doneData,
	fn: data => `https://academtest.ilink.dev/images/${data.profileImage}`,
	target: $avatarURL,
})

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
	clock: myProfileForm.submit,
	source: myProfileForm.$values,
	target: updateMyProfileFx,
})

export const updateProfilePhotoFx = createEffect<FileList, Types.MyProfileType, Error>(async profileImage => {
	const formData = new FormData()
	formData.append('profileImage', profileImage[0])
	return await updateSelfPhoto(formData)
})

sample({
	clock: myProfileForm.fields.profileImage.onChange,
	source: myProfileForm.fields.profileImage.$errors,
	filter: source => !source.length,
	fn: (_, file) => file,
	target: updateProfilePhotoFx,
})

sample({
	clock: [updateMyProfileFx.doneData, updateProfilePhotoFx.doneData],
	target: getProfileData,
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
