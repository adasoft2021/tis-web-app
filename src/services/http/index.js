import axios, { AxiosRequestConfig } from 'axios'
import environment from '../../config/environment'

const { BASE_API } = environment

const initial = { ...AxiosRequestConfig }

/**
 * Función para crear una instancia de axios para realizar las peticiones a la API.
 *
 * @param {*} config contiene la url, que por defecto es un string vacío, que será parte de la url base para la instancia de axios.
 * Para más configuraciones ver {@link AxiosRequestConfig}.
 * @returns {*} instacia de axios creada de acuerdo a la configuración enviada como parámetro.
 */
export default function createInstance({ url = '', rest = initial }) {
	return axios.create({
		baseURL: `${BASE_API && BASE_API}${url && url}`,
		...rest,
	})
}
