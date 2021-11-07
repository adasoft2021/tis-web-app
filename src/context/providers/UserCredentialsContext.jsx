import { createContext, useContext, useEffect, useReducer } from 'react'
import { USER_CREDENTIALS_ACTIONS } from '../actions/userCredentialsActions'
import {
	userCredentialsInitialState,
	userCredentialsReducer,
} from '../reducers/userCredentialsReducer'

const UserCredentialsContext = createContext({
	...userCredentialsInitialState,
	setUserCredentials: (credentials) => {},
})

export const useUserCredentials = () => {
	const context = useContext(UserCredentialsContext)
	return context
}

export const UserCredentialsProvider = ({ children }) => {
	const [state, dispatch] = useReducer(
		userCredentialsReducer,
		userCredentialsInitialState
	)

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('credentials'))
		if (user) {
			dispatch({
				type: USER_CREDENTIALS_ACTIONS.SET_USER_CREDENTIALS,
				payload: user,
			})
		} else {
			dispatch({
				type: USER_CREDENTIALS_ACTIONS.SET_USER_CREDENTIALS,
				payload: { ...state, userType: 'ADVISER', id: 1 },
			})
		}
	}, [])

	/**
	 * Función que permite actualizar las credenciales del usuario en el
	 * contexto {@link UserCredentialsContext} y en el localStorage.
	 *
	 * @param {*} credentials es un objeto que contiene el id,
	 * el token y el userType(tipo de usuario) ver más en
	 * {@link userCredentialsInitialState}.
	 */
	const setUserCredentials = (credentials) => {
		dispatch({
			type: USER_CREDENTIALS_ACTIONS.SET_USER_CREDENTIALS,
			payload: credentials,
		})
		localStorage.setItem('credentials', JSON.stringify(credentials))
	}

	return (
		<UserCredentialsContext.Provider
			value={{ ...state, setUserCredentials }}
		>
			{children}
		</UserCredentialsContext.Provider>
	)
}
