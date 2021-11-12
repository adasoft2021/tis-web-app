const getToDay = () => {
	const ToDay = new Date()
	const now = `${ToDay.getUTCFullYear()}-${
		ToDay.getUTCMonth() + 1
	}-${ToDay.getUTCDate()}`
	return now
}
export default getToDay
