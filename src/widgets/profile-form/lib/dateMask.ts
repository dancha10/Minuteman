export const dateMask = (value: string): string => {
	const dateString = value.replace(/\D/g, '').slice(0, 10)
	if (dateString.length >= 5) {
		return `${dateString.slice(0, 2)}.${dateString.slice(2, 4)}.${dateString.slice(4)}`
	}
	if (dateString.length >= 3) {
		return `${dateString.slice(0, 2)}.${dateString.slice(2)}`
	}
	return dateString
}