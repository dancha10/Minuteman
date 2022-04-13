export const fullNameValidator = {
	required: 'Это поле обязательное',
	pattern: {
		value: /([а-яА-ЯёЁ]{2,}\s[а-яА-ЯёЁ]{1,}'?-?[а-яА-ЯёЁ]{2,}\s?([а-яА-ЯёЁ]{1,})?)+$/i,
		message: 'Введите имя и фамилию русскими буквами',
	},
	maxLength: {
		value: 35,
		message: 'Махимальная длина фамилии и имени 35 символов',
	},
}
export const detailedReviewValidator = {
	required: 'Это поле обязательное',
	minLength: {
		value: 3,
		message: 'Минимальная длина отзыва 3 символа',
	},
}
