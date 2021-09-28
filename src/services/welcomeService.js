import createInstance from './http'

const welcomeService = createInstance({ url: '/welcome' })

export async function welcome(name = 'username') {
	const response = await welcomeService.get(`/${encodeURI(name)}`)
	return response.data
}
