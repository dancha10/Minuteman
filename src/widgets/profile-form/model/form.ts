import { sample } from 'effector'
import { createForm } from 'effector-forms'
import * as yup from 'yup'
import { SingleValue } from 'react-select'

import { createRule, Types } from 'shared/lib'
import { REQUIRED_MESSAGE } from 'shared/const'

import { dateMask } from '../lib/dateMask'

export const myProfileForm = createForm({
	fields: {
		firstName: {
			init: '',
			rules: [
				createRule<string>({
					name: 'firstName',
					schema: yup.string().required(REQUIRED_MESSAGE),
				}),
			],
		},
		lastName: {
			init: '',
			rules: [
				createRule<string>({
					name: 'lastName',
					schema: yup.string().required(REQUIRED_MESSAGE),
				}),
			],
		},
		birthDate: {
			init: '',
			rules: [
				createRule<string>({
					name: 'birthDate',
					schema: yup
						.string()
						.required(REQUIRED_MESSAGE)
						.test({
							message: 'Дата рождения не должна быть больше сегодняшней',
							test: value => new Date(value!) < new Date(),
						}),
				}),
			],
		},
		cityOfResidence: {
			init: {} as SingleValue<any>,
			rules: [
				createRule<Types.OptionProps>({
					name: 'cityOfResidence',
					schema: yup.object().nullable(),
				}),
			],
		},
		gender: {
			init: {} as SingleValue<any>,
			rules: [
				createRule<Types.OptionProps>({
					name: 'gender',
					schema: yup.object().nullable(),
				}),
			],
		},
		hasPet: {
			init: {} as SingleValue<any>,
			rules: [
				createRule<Types.OptionProps>({
					name: 'hasPet',
					schema: yup.object().nullable(),
				}),
			],
		},
		aboutMe: {
			init: '',
			rules: [
				createRule<string>({
					name: 'aboutMe',
					schema: yup.string().required(REQUIRED_MESSAGE),
				}),
			],
		},
		smallAboutMe: {
			init: '',
			rules: [
				createRule<string>({
					name: 'smallAboutMe',
					schema: yup.string(),
				}),
			],
		},
		profileImage: {
			init: {} as FileList,
			rules: [
				createRule<FileList>({
					name: 'profileImage',
					schema: yup
						.mixed()
						.test({
							message: 'Размер файла не должен превышать 5мб',
							test: (file: FileList) => file[0].size < 1024 * 1024 * 5,
						})
						.test({
							message: 'Доступные форматы изображений jpeg и png.',
							test: (file: FileList) => /\.(jpe?g|png)$/i.test(file[0]?.name),
						}),
				}),
			],
		},
	},
	validateOn: ['change', 'submit'],
})

sample({
	clock: myProfileForm.fields.birthDate.onChange,
	fn: text => dateMask(text),
	target: myProfileForm.fields.birthDate.$value,
})
