import createInstance from './http'

const welcomeService = createInstance({ url: '/welcome' })

export async function welcome(name = 'username') {
	const response = await welcomeService.get(`/${name}`)
	return response.data
}
