export const emailRegex =
	/^((?=[a-zA-Z0-9])[a-zA-Z0-9!#$%&\\'*+\-\/=?^_`.{|}~]{1,25})@(([a-zA-Z0-9\-]){1,25}\.)([a-zA-Z0-9]{2,4})$/

export const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,24}$/

export const numbersRegex = /^[0-9]+$/

export const fullNameRegex = /([а-яА-ЯёЁ]{2,}\s[а-яА-ЯёЁ]{1,}'?-?[а-яА-ЯёЁ]{2,}\s?([а-яА-ЯёЁ]{1,})?)+$/i
