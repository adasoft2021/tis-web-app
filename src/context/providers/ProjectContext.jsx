import { createContext, useContext, useReducer } from 'react'
import { PROJECT_ACTIONS } from '../actions/projectActions'
import { projectInitialState, projectReducer } from '../reducers/projectReducer'
import * as projectService from '../../services/projectService'
import { useUserCredentials } from './UserCredentialsContext'
import { useToast } from './ToastContext'

const ProjectContext = createContext({
	...projectInitialState,
	/**
	 * Función para crear un Proyecto por parte del Asesor.
	 *
	 * @param {{
	 *      title: string,
	 *      announcementId: number,
	 *      specificationSheetId: number}} projectDTO proyecto a crear que
	 * contiene el título del Proyecto, el ID de la Convocatoria y el ID del
	 * Pliego de Especificaciones relacionados al Proyecto.
	 *
	 * @returns {Promise<boolean>} true si se creó el proyecto y false caso
	 * contrario.
	 */
	createProject: async (projectDTO) => {},

	getAdviserProjects: async () => {},
})

export function useProject() {
	const context = useContext(ProjectContext)

	return context
}

export function ProjectProvider({ children }) {
	const { showToast } = useToast()
	const { id, token } = useUserCredentials()
	const [state, dispatch] = useReducer(projectReducer, projectInitialState)

	const createProject = async ({ title, ...rest }) => {
		showToast({
			color: 'info',
			message: 'Su solicitud está siendo procesada.',
		})
		try {
			const projectResponse = await projectService.createProject({
				adviserId: id,
				projectDTO: { title, ...rest },
				token,
			})
			dispatch({
				type: PROJECT_ACTIONS.ADD_CREATED_PROJECT,
				payload: projectResponse,
			})
			showToast({
				color: 'success',
				message: `Se creó el Proyecto ${title}.`,
			})
			return true
		} catch ({
			response: {
				data: { message },
				status,
			},
		}) {
			showToast({
				color: 'danger',
				message:
					status < 500
						? message
						: 'Ocurrió algún error con el servidor. Intente más tarde.',
			})
			return false
		}
	}

	const getAdviserProjects = async () => {
		dispatch({
			type: PROJECT_ACTIONS.LOAD_ADVISER_PROJECTS_SUCCESS,
			payload: [
				{ id: 1, title: 'TIS Plataform' },
				{ id: 2, title: 'MailList' },
			],
		})
	}

	return (
		<ProjectContext.Provider
			value={{ ...state, createProject, getAdviserProjects }}
		>
			{children}
		</ProjectContext.Provider>
	)
}
