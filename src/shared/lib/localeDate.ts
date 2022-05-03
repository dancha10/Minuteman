export const localeDateString = (dateString: string): string => {
	let date = new Date(dateString).toLocaleDateString().split(',')[0]
	if (date.includes('/')) {
		const russianFormatDate = date.split('/')
		date = `${russianFormatDate[1]}.${russianFormatDate[0]}.${russianFormatDate[2]}`
	}

	if (date.length < 10) {
		const normalize = date.split('.')

		if (normalize[0].length === 1) normalize[0] = `0${normalize[0]}`
		if (normalize[1].length === 1) normalize[1] = `0${normalize[1]}`

		return normalize.join('.')
	}

	return date
}
