export const getCurrentAge = (dateOfBirth: string): number => {
	const fragmentationDate = dateOfBirth.split('.')
	const day = +fragmentationDate[0]
	const month = +fragmentationDate[1]
	const year = +fragmentationDate[2]
	const date = new Date().getTime() - new Date(`${year}.${month}.${day}`).getTime()
	return Math.floor(date / (24 * 3600 * 365.25 * 1000))
}
