import { createContext, useContext, useEffect, useReducer } from 'react'
import { SPACE_ACTIONS } from '../actions/spaceActions'
import { spaceInitialState, spaceReducer } from '../reducers/spaceReducer'
import * as spaceService from '../../services/spaceService'
import { useUserCredentials } from './UserCredentialsContext'
import { useToast } from './ToastContext'
const SpaceContext = createContext({
	...spaceInitialState,
	getSpaceById: async ({ spaceId }) => {},
	getProjectSpaces: ({ projectId }) => {},
	getCompanySpaces: async () => {},
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

export const useCompanySpaces = () => {
	const { getCompanySpaces, isLoading, spaces } = useSpace()
	useEffect(() => {
		getCompanySpaces()
	}, [])
	return { isLoading, spaces }
}

export const SpaceProvider = ({ children }) => {
	const { showToast } = useToast()
	const { token, id } = useUserCredentials()
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

	const getProjectSpaces = async ({ projectId }) => {
		if (projectId) {
			dispatch({
				type: SPACE_ACTIONS.LOAD_PROJECT_SPACES_SUCCESS,
				payload: [
					{ id: '1', title: 'Parte A' },
					{ id: '2', title: 'Parte B' },
					{ id: '3', title: 'Orden de cambio' },
				],
			})
		} else {
			dispatch({ type: SPACE_ACTIONS.STOP_LOADING })
		}
	}

	const getCompanySpaces = async () => {
		dispatch({ type: SPACE_ACTIONS.LOAD_COMPANY_SPACES })
		try {
			const spaces = await spaceService.getCompanySpaces({
				token,
				companyId: id,
			})
			dispatch({
				type: SPACE_ACTIONS.LOAD_COMPANY_SPACES_SUCCESS,
				payload: spaces,
			})
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
		<SpaceContext.Provider
			value={{
				...state,
				getSpaceById,
				getProjectSpaces,
				getCompanySpaces,
			}}
		>
			{children}
		</SpaceContext.Provider>
	)
}
