import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState,
} from 'react'

import * as spaceAnswerService from '../../services/spaceAnswerService'
import {
	spaceAnswerInitialState,
	spaceAnswerReducer,
} from '../reducers/spaceAnswerReducer'
import { SPACE_ANSWER_ACTIONS } from '../actions/spaceAnswerActions'
import { useToast } from './ToastContext'
import { useUserCredentials } from './UserCredentialsContext'

const SpaceAnswerContext = createContext({
	...spaceAnswerInitialState,
	createSpaceAnswer: async ({ spaceId, dto }) => {},
	getSpaceAnwers: async ({ spaceId }) => {},
})

export const useSpaceAnswer = () => {
	const context = useContext(SpaceAnswerContext)
	return context
}
export const useAdviserSpaceAnswers = () => {
	const { getSpaceAnwers, isLoading, spaceAnswers } = useSpaceAnswer()

	const [spaceId, setSpaceId] = useState(null)
	useEffect(() => {
		if (spaceId) getSpaceAnwers({ spaceId })
	}, [spaceId])

	return { isLoading, spaceAnswers, setSpaceId }
}

export const SpaceAnswerProvider = ({ children }) => {
	const { showToast } = useToast()

	const [state, dispatch] = useReducer(
		spaceAnswerReducer,
		spaceAnswerInitialState
	)
	const { id } = useUserCredentials()

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
	const getSpaceAnswers = async ({ spaceId }) => {
		dispatch({ type: SPACE_ANSWER_ACTIONS.LOAD_SPACE_ANSWERS_LIST })
		try {
			const spaceAnswers = await spaceAnswerService.getSpaceAnswers({
				adviserId: id,
				spaceId,
			})
			dispatch({
				type: SPACE_ANSWER_ACTIONS.LOAD_SPACE_ANSWERS_LIST_SUCCESS,
				payload: spaceAnswers,
			})
		} catch ({ response }) {
			showToast({
				color: 'danger',
				message:
					response.status < 500
						? response.data.message
						: 'Ocurrio algun error con el servidor',
			})
			dispatch({ type: SPACE_ANSWER_ACTIONS.STOP_LOADING })
		}
	}
	return (
		<SpaceAnswerContext.Provider
			value={{ ...state, createSpaceAnswer, getSpaceAnswers }}
		>
			{children}
		</SpaceAnswerContext.Provider>
	)
}
