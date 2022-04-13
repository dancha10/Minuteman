import { createEvent } from 'effector'

import { Types } from 'shared/lib'

export const localeDateString = (): string => {
	const date = new Date().toLocaleDateString()
	if (date.includes('/')) {
		const russianFormatDate = date.split('/')
		return `${russianFormatDate[1]}.${russianFormatDate[0]}.${russianFormatDate[2]}`
	}
	return date
}

export const sentReview = createEvent<Types.IUserReview>()
