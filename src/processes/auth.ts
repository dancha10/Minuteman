import { createEffect, createEvent, sample } from 'effector'

import { AuthModel } from 'features/auth/by-email'

export const checkedAuth = createEvent()

const checkAuthFx = createEffect<void, string | null, Error>(() => localStorage.getItem('@token'))

sample({
	clock: checkedAuth,
	target: checkAuthFx,
})

sample({
	clock: checkAuthFx.doneData,
	fn: token => !!token,
	target: AuthModel.$isAuthenticated,
})
