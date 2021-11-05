import createInstance from './http'

const adviserService = createInstance({ url: '/advisers' })

export async function getSpaceAnswers({ adviserId, spaceId }) {
	const response = await adviserService.get(`/${adviserId}/spaces/${spaceId}`)
	return response.data
}
