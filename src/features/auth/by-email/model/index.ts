import { createEffect, createStore, restore, sample } from 'effector'
import { persist } from 'effector-storage/local'
import { createForm } from 'effector-forms'
import * as yup from 'yup'

import { ErrorModel } from 'entities/error'
import { login } from 'shared/api'
import { createRule, emailRegexp, passwordRegexp } from 'shared/lib'

interface IAuthFormFields {
	email: string
	password: string
}

const REQUIRED_MESSAGE = 'Это поля является обязательным'

export const loginForm = createForm({
	fields: {
		email: {
			init: '',
			rules: [
				createRule<string>({
					name: 'email',
					schema: yup.string().required(REQUIRED_MESSAGE).matches(emailRegexp, 'Введите корректный email'),
				}),
			],
		},
		password: {
			init: '',
			rules: [
				createRule<string>({
					name: 'password',
					schema: yup
						.string()
						.required(REQUIRED_MESSAGE)
						.min(8, 'Минимальная длина пароля 8 символов')
						.max(24, 'Максимальная длина пароля 24 символа')
						.matches(
							passwordRegexp,
							'Пароль должен содержать прописные и строчные буквы, а также спецсимволы и цифры'
						),
				}),
			],
		},
	},
	validateOn: ['submit', 'change'],
})

export const authFx = createEffect<IAuthFormFields, string, Error>(async ({ email, password }) => {
	return await login(email, password)
})

sample({
	clock: loginForm.submit,
	source: loginForm.$values,
	target: authFx,
})

export const $accessToken = restore(authFx.doneData, '')

persist({ store: $accessToken, key: '@token' })

export const $isAuthenticated = createStore<boolean>(false)

sample({
	clock: $accessToken,
	fn: Boolean,
	target: $isAuthenticated,
})

sample({
	clock: authFx.failData,
	fn: () => 'Такого пользователя не существует',
	target: ErrorModel.setError,
})
