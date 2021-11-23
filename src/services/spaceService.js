import createInstance from './http'
import { getCompanySpaces } from './companyService'
const spaceService = createInstance({ url: '/spaces' })

export async function getSpaceById({ spaceId, token }) {
	const response = await spaceService.get(`/${spaceId}`, {
		headers: { 'X-Token': token },
	})
	return response.data
}

export { getCompanySpaces }
