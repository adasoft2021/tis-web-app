import createInstance from './http'
import { createClassCode } from './adviserService'
const classCodeService = createInstance({ url: '/class-codes' })

export async function validateClassCode({ code }) {
	const response = await classCodeService.post('', { code })
	return response.data
}

export { createClassCode }
