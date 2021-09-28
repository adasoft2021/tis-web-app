import { createContext, useContext, useReducer } from 'react'
import { welcome } from '../../services/welcomeService'
import { WELCOME_ACTIONS } from '../actions/welcomeActions'
import { welcomeInitialState, welcomeReducer } from '../reducers/welcomeReducer'

export const WelcomeContext = createContext({
	...welcomeInitialState,
	loadMessage: async (name) => {},
})

export const useWelcome = () => {
	const context = useContext(WelcomeContext)

	return context
}

export const WelcomeProvider = ({ children }) => {
	const [state, dispatch] = useReducer(welcomeReducer, welcomeInitialState)

	const loadMessage = async (name) => {
		dispatch({ type: WELCOME_ACTIONS.LOAD_MESSAGE })
		try {
			const { id, message } = await welcome(name)
			dispatch({
				type: WELCOME_ACTIONS.LOAD_MESSAGE_SUCCESS,
				payload: `${id}, ${message}`,
			})
		} catch (error) {
			dispatch({
				type: WELCOME_ACTIONS.LOAD_MESSAGE_ERROR,
				payload: error.message,
			})
		}
	}

	return (
		<WelcomeContext.Provider value={{ ...state, loadMessage }}>
			{children}
		</WelcomeContext.Provider>
	)
}
