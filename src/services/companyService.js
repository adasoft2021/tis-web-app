import createInstance from './http'

const companyService = createInstance({ url: '/companies' })

export async function getAllCompanies() {
	const response = await companyService.get('', {})
	return response.data
}

export async function getCompany(companyId) {
	const response = await companyService.get(`/${companyId}`)
	return response.data
}
