import createInstance from './http'

export const PUBLICATION_TYPE = {
	ANNOUNCEMENT: 'ANNOUNCEMENT',
	SPECIFICATION_SHEET: 'SPECIFICATION_SHEET',
}

const publicationService = createInstance({ url: '/publications' })

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
