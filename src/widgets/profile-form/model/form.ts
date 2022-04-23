import { createEvent, createStore } from 'effector'

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

// Якобы отправили данные на бэк
export const $fieldsForm = createStore<IProfileFormFields>({
	firsName: 'Данил',
	lastName: 'Абраменко',
	dateOfBirth: '10.08.2001',
	city: 'Москва',
	sex: 'Мужской',
	pet: 'Нет',
	shortInfo: 'Big dick',
	aboutMe: 'About me',
}).on(setFieldsForm, (_, fields) => fields)

$fieldsForm.watch(el => console.log(el))
