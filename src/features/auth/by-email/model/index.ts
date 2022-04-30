import { createEffect, createEvent, createStore, restore, sample } from 'effector'
import { persist } from 'effector-storage/local'

import { ErrorModel } from 'entities/error'
import { login } from 'shared/api'

export interface IAuthFormFields {
	email: string
	password: string
}

export const sentAuthForm = createEvent<IAuthFormFields>()

const authFx = createEffect<IAuthFormFields, string, Error>(async ({ email, password }) => {
	return await login(email, password)
})

sample({
	clock: sentAuthForm,
	target: authFx,
})

export const $accessToken = restore(authFx.doneData, '') // TODO effector storage

persist({ store: $accessToken, key: '@token' })

export const $isAuthenticated = createStore<boolean>(false)

sample({
	clock: $accessToken,
	fn: token => !!token,
	target: $isAuthenticated,
})

sample({
	clock: authFx.failData,
	fn: clock => clock.message,
	target: ErrorModel.setError,
})
