import createInstance from './http'

const spaceService = createInstance({ url: '/spaces' })

export async function createSpaceAnswer({ spaceId, spaceAnswerDTO }) {
	const response = await spaceService.post(`/${spaceId}`, spaceAnswerDTO)

	return response.data
}
