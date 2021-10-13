import createInstance from './http'

const publicationService = createInstance({ url: '/publications' })

export async function updatePublication({ publicationId, publicationDTO }) {
	const response = publicationService.put(`/${publicationId}`, publicationDTO)

	return response.data
}
