export const validationFields = {
	firstName: {
		required: 'Это поле обязательное',
		pattern: {
			value: /^([а-яё]+|[a-z]+)$/i,
			message: 'Имя может состоять только из русских и латинских букв',
		},
	},
	lastName: {
		required: 'Это поле обязательное',
		pattern: {
			value: /^([а-яёА-яЁ]+|[a-zA-z]+)$/i,
			message: 'Фамилия может состоять только из русских и латинских букв',
		},
	},
	dateOfBirth: {
		required: 'Это поле обязательное',
		max: {
			value: Number(new Date()) + 3000, // Для погрешности
			message: 'Дата рождения не должна быть больше сегодняшней',
		},
	},
}
