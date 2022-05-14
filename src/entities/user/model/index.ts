import { createEffect, createEvent, forward, restore } from 'effector'

import { getMyProfile } from 'shared/api'
import { Types } from 'shared/lib'

export const getResponse = createEvent()
export const getResponseFx = createEffect<void, Types.MyProfileType, Error>(async () => await getMyProfile())

export const $userProfile = restore(getResponseFx.doneData, null)

forward({
	from: getResponse,
	to: getResponseFx,
})
