import { createEffect, restore, sample } from 'effector'

import { MainPageGate, Types } from 'shared/lib'
import { getMyProfile } from 'shared/api'

export const getCurrentAge = (dateOfBirth: string): number => {
	const fragmentationDate = dateOfBirth.split('.')
	const day = +fragmentationDate[0]
	const month = +fragmentationDate[1]
	const year = +fragmentationDate[2]
	const date = new Date().getTime() - new Date(`${year}.${month}.${day}`).getTime()
	return Math.floor(date / (24 * 3600 * 365.25 * 1000))
}

export const getProfileFx = createEffect<void, Types.MyProfileType, Error>(async () => await getMyProfile())
export const $profileInfo = restore(getProfileFx.doneData, null)

sample({
	clock: MainPageGate.open,
	target: getProfileFx,
})
