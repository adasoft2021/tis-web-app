import { createContext, useContext, useReducer } from 'react'
import { PROYECT_ACTIONS } from '../actions/proyectActions'
import { proyectInitialState, proyectReducer } from '../reducers/proyectReducer'
const ProyectContext = createContext({
	...proyectInitialState,
	getAdviserProyects: () => {},
})

export const useProyect = () => {
	const context = useContext(ProyectContext)
	return context
}
export const ProyectProvider = ({ children }) => {
	const [state, dispatch] = useReducer(proyectReducer, proyectInitialState)
	const getAdviserProyects = async () => {
		dispatch({
			type: PROYECT_ACTIONS.LOAD_ADVISER_PROYECTS_SUCCESS,
			payload: [
				{ id: 1, title: 'TIS Plataform' },
				{ id: 2, title: 'MailList' },
			],
		})
	}
	return (
		<ProyectContext.Provider value={{ ...state, getAdviserProyects }}>
			{children}
		</ProyectContext.Provider>
	)
}
