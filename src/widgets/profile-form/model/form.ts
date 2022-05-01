import { createEffect, createEvent, createStore, restore, sample } from 'effector'

import { Types } from 'shared/lib'
import { getMyProfile } from 'shared/api'

export interface IProfileFormFields {
	firsName: string
	lastName: string
	dateOfBirth: string
	city: string
	sex: string
	pet: string
	shortInfo: string
	aboutMe: string
}

export const setFieldsForm = createEvent<IProfileFormFields>()

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
