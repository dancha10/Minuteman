export const localeDateString = (dateString: string): string => {
	const date = new Date(dateString).toLocaleDateString().split(',')[0]
	if (date.includes('/')) {
		const russianFormatDate = date.split('/')
		return `${russianFormatDate[1]}.${russianFormatDate[0]}.${russianFormatDate[2]}`
	}
	return date
}
