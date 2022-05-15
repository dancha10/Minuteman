import { createForm } from 'effector-forms'
import { sample } from 'effector'
import * as yup from 'yup'

import { createRule } from 'shared/lib'
import { REQUIRED_MESSAGE } from 'shared/const'
import { NotificationModel } from 'entities/notification'

export const recoveryForm = createForm({
	fields: {
		email: {
			init: '',
			rules: [
				createRule({
					name: 'email',
					schema: yup.string().required(REQUIRED_MESSAGE),
				}),
			],
		},
	},
})

sample({
	clock: recoveryForm.submit,
	source: recoveryForm.fields.email.$errors,
	filter: error => !error.length,
	fn: () => ({
		type: 'success',
		title: 'Пароль изменен',
		message: 'Код успешно отправлен на вашу почту!',
	}),
	target: NotificationModel.setNotify,
})
