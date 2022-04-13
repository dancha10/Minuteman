import { createEvent, createStore } from 'effector'

export interface IAuthFormFields {
	login: string
	password: string
}

export const sentAuthForm = createEvent<IAuthFormFields>()
export const $authFormData = createStore<IAuthFormFields>({
	login: '',
	password: '',
}).on(sentAuthForm, (_, fields) => fields)

$authFormData.watch(el => console.log(el))
