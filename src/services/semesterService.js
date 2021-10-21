import createInstance from './http'

const semesterService = createInstance({ url: '/semesters' })

export async function getCurrentSemester() {
	const response = await semesterService.get('/now')
	return response.data
}
