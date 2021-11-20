import { createContext, useContext, useEffect, useReducer } from 'react'
import { SPACE_ACTIONS } from '../actions/spaceActions'
import { spaceInitialState, spaceReducer } from '../reducers/spaceReducer'
import * as spaceService from '../../services/spaceService'
import { useUserCredentials } from './UserCredentialsContext'
import { useToast } from './ToastContext'
const SpaceContext = createContext({
	...spaceInitialState,
	getSpaceById: async ({ spaceId }) => {},
})
export const useSpace = () => {
	const context = useContext(SpaceContext)
	return context
}
export const useSpaceInformation = ({ spaceId }) => {
	const { getSpaceById, isLoading, spaceDTO } = useSpace()
	useEffect(() => {
		getSpaceById({ spaceId })
	}, [])
	return { isLoading, spaceDTO }
}
export const SpaceProvider = ({ children }) => {
	const { showToast } = useToast()
	const { token } = useUserCredentials()
	const [state, dispatch] = useReducer(spaceReducer, spaceInitialState)

	const getSpaceById = async ({ spaceId }) => {
		dispatch({ type: SPACE_ACTIONS.LOAD_SPACE })
		try {
			const space = await spaceService.getSpaceById({ spaceId, token })
			dispatch({ type: SPACE_ACTIONS.LOAD_SPACE_SUCCESS, payload: space })
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
			dispatch({ type: SPACE_ACTIONS.STOP_LOADING })
		}
	}
	return (
		<SpaceContext.Provider value={{ ...state, getSpaceById }}>
			{children}
		</SpaceContext.Provider>
	)
}
