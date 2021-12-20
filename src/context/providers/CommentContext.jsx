import { createContext, useContext, useReducer } from 'react'
import { COMMENT_ACTIONS } from '../actions/commentActions'
import { commentInitialState, commentReducer } from '../reducers/commentReducer'
import { useToast } from './ToastContext'
import { useUserCredentials } from './UserCredentialsContext'
import * as commentService from '../../services/commentService'
const CommentContext = createContext({
	...commentInitialState,
	createComment: async ({ commentDTO }) => {},
})

export const useComment = () => {
	const context = useContext(CommentContext)
	return context
}

export const CommentProvider = ({ children }) => {
	const { showToast } = useToast()
	const [state, dispatch] = useReducer(commentReducer, commentInitialState)

	const { id, token } = useUserCredentials()
	const createComment = async ({ commentDTO }) => {
		dispatch({ type: COMMENT_ACTIONS.LOAD_REQUEST })
		try {
			const comment = await commentService.createComment({
				discussionId: id,
				token,
				commentDTO,
			})
			dispatch({
				type: COMMENT_ACTIONS.LOAD_CREATE_COMMENT_SUCCESS,
				payload: comment,
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
			dispatch({ type: COMMENT_ACTIONS.STOP_LOADING })
		}
	}
	return (
		<CommentContext.Provider value={{ ...state, createComment }}>
			{children}
		</CommentContext.Provider>
	)
}
