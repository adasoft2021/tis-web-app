import createInstance from './http'

const publicationService = createInstance({ url: '/publications' })

export async function createPublication({ publicationDTO }) {
	const response = await publicationService.post('', publicationDTO)

	return response.data
}

export async function updatePublication({ publicationId, publicationDTO }) {
	const response = await publicationService.put(
		`/${publicationId}`,
		publicationDTO
	)

	return response.data
}

export async function getAllAdviserPublications({
	adviserId,
	publicationType,
}) {
	const response = await publicationService.get('', {
		params: {
			adviserId,
			type: publicationType,
		},
	})

	return response.data
}

export async function deletePublication({ publicationId }) {
	await publicationService.delete(`/${publicationId}`)
}
