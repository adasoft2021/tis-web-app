import { createContext, useContext, useReducer } from 'react'
import * as discussionService from '../../services/discussionService'
import { DISCUSSION_ACTIONS } from '../actions/discussionActions'
import {
	discussionInitialState,
	discussionReducer,
} from '../reducers/discussionReducer'
import { useToast } from './ToastContext'
import { useUserCredentials } from './UserCredentialsContext'

const DiscussionContext = createContext({
	...discussionInitialState,
	/**
	 *
	 * @param {{topic: string, companyId: number | null}} discussionDTO
	 */
	createDiscussion: async ({ discussionDTO }) => {},
})

export const useDiscussion = () => {
	const context = useContext(DiscussionContext)

	return context
}

export const DiscussionProvider = ({ children }) => {
	const { showToast } = useToast()

	const [state, dispatch] = useReducer(
		discussionReducer,
		discussionInitialState
	)
	const { token } = useUserCredentials()

	const createDiscussion = async ({ discussionDTO }) => {
		showToast({
			color: 'info',
			message: 'Su solicitud esta siendo procesada',
		})
		dispatch({ type: DISCUSSION_ACTIONS.LOAD_REQUEST })
		try {
			const discussion = await discussionService.createContext({
				token,
				discussionDTO,
			})
			dispatch({
				type: DISCUSSION_ACTIONS.LOAD_CREATE_DISCUSSION_SUCCESS,
				payload: discussion,
			})
			showToast({
				color: 'success',
				message: 'El tema de discusión ha sido creado con exito',
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
						: 'El servicio no está disponible en estos momentos',
			})
			dispatch({ type: DISCUSSION_ACTIONS.STOP_LOADING })
		}
	}
	return (
		<DiscussionContext.Provider value={{ ...state, createDiscussion }}>
			{children}
		</DiscussionContext.Provider>
	)
}
