export const validationFields = {
	firstName: {
		pattern: {
			value: /^([а-яё]+|[a-z]+)$/i,
			message: 'Имя может состоять только из русских и латинских букв',
		},
	},
	lastName: {
		pattern: {
			value: /^([а-яёА-яЁ]+|[a-zA-z]+)$/i,
			message: 'Фамилия может состоять только из русских и латинских букв',
		},
	},
}
