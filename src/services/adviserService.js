import createInstance from './http'

const adviserService = createInstance({ url: '/advisers' })

export async function createClassCode({ token, adviserId }) {
	const response = await adviserService.post(`/${adviserId}/class-code`, {
		headers: { Authorization: token },
	})
	return response.data
}

export async function getSpaceAnswers({ adviserId, spaceId }) {
	const response = await adviserService.get(`/${adviserId}/spaces/${spaceId}`)
	return response.data
}
