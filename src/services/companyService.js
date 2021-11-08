import createInstance from './http'

const companyService = createInstance({ url: '/companies' })

export async function getAllCompanies() {
	const response = await companyService.get('')
	return response.data
}

export async function getCompany({ token, companyId }) {
	const response = await companyService.get(`/${companyId}`, {
		headers: { 'X-Token': token },
	})
	return response.data
}

export async function registerCompany({ registrationCode, companyDTO }) {
	const response = await companyService.post('', companyDTO, {
		params: { registrationCode },
	})
	return response.data
}

export async function updateCompany({ token, companyDTO, companyId }) {
	const response = await companyService.put(`/${companyId}`, companyDTO, {
		headers: { 'X-Token': token },
	})
	return response.data
}
