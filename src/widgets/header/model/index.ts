import { createEffect, createEvent, restore, sample } from 'effector'

import { getMyProfile } from 'shared/api'

export const getUserData = createEvent()
export const userDataFx = createEffect(async () => await getMyProfile())
export const $userData = restore(userDataFx.doneData, null)

sample({
	clock: getUserData,
	target: userDataFx,
})
