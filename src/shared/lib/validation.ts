export const authValidation = {
	email: {
		required: 'Это поле обязательное',
		pattern: {
			value: /^((?=[a-zA-Z0-9])[a-zA-Z0-9!#$%&\\'*+\-\/=?^_`.{|}~]{1,25})@(([a-zA-Z0-9\-]){1,25}\.)([a-zA-Z0-9]{2,4})$/,
			message: 'Введите корректный email',
		},
		maxLength: {
			value: 40,
			message: 'Слишком длинный email',
		},
	},
	password: {
		required: 'Это поле обязательное',
		pattern: {
			value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,24}$/,
			message: 'Пароль должен содержать латиницу и прописные буквы',
		},
		minLength: {
			value: 8,
			message: 'Минимальная длина 8 символов',
		},
		maxLength: {
			value: 24,
			message: 'Максимальная длина 24 символа',
		},
	},
}
