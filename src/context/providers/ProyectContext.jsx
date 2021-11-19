import { createContext, useContext, useReducer } from 'react'
import { PROJECT_ACTIONS } from '../actions/projectActions'
import { projectInitialState, projectReducer } from '../reducers/projectReducer'
const ProjectContext = createContext({
	...projectInitialState,
	getAdviserProjects: () => {},
})

export const useProject = () => {
	const context = useContext(ProjectContext)
	return context
}
export const ProjectProvider = ({ children }) => {
	const [state, dispatch] = useReducer(projectReducer, projectInitialState)
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
		<ProjectContext.Provider value={{ ...state, getAdviserProjects }}>
			{children}
		</ProjectContext.Provider>
	)
}
