import { createContext, useContext, useReducer } from 'react'

import * as spaceAnswerService from '../../services/spaceAnswerService'
import {
	spaceAnswerInitialState,
	spaceAnswerReducer,
} from '../reducers/spaceAnswerReducer'
import { SPACE_ANSWER_ACTIONS } from '../actions/spaceAnswerActions'
import { useToast } from './ToastContext'

const SpaceAnswerContext = createContext({
	...spaceAnswerInitialState,
	createSpaceAnswer: async ({ companyId, dto }) => {},
})

export const useSpaceAnswer = () => {
	const context = useContext(SpaceAnswerContext)
	return context
}
export const SpaceAnswerProvider = ({ children }) => {
	const { showToast } = useToast()

	const [state, dispatch] = useReducer(
		spaceAnswerReducer,
		spaceAnswerInitialState
	)

	const createSpaceAnswer = async ({ spaceId, spaceAnswerDTO }) => {
		dispatch({ type: SPACE_ANSWER_ACTIONS.LOAD_CREATE_SPACE_ANSWER })
		try {
			const spaceAnswer = await spaceAnswerService.createSpaceAnswer({
				spaceId,
				spaceAnswerDTO,
			})
			dispatch({
				type: SPACE_ANSWER_ACTIONS.LOAD_CREATE_SPACE_ANSWER_SUCCESS,
				payload: spaceAnswer,
			})
			showToast({
				color: 'success',
				message: 'Guardada exitosamente',
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
			dispatch({ type: SPACE_ANSWER_ACTIONS.STOP_LOADING })
		}
	}
	return (
		<SpaceAnswerContext.Provider value={{ ...state, createSpaceAnswer }}>
			{children}
		</SpaceAnswerContext.Provider>
	)
}
