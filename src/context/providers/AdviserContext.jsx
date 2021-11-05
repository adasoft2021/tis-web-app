import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState,
} from 'react'

import * as adviserService from '../../services/adviserService'
import { adviserInitialState, adviserReducer } from '../reducers/adviserReducer'
import { ADVISER_ACTIONS } from '../actions/adviserActions'
import { useToast } from './ToastContext'
import { useUserCredentials } from './UserCredentialsContext'
import { userTypes } from '../reducers/userCredentialsReducer'

const AdviserContext = createContext({
	...adviserInitialState,
	getSpaceAnwers: async ({ adviserId, spaceId }) => {},
})

export const useAdviser = () => {
	const context = useContext(AdviserContext)

	return context
}

export const useSpaceAnswer = () => {
	const { getSpaceAnwers, isLoading, spaceAnswers } = useAdviser()
	const { id, userType } = useUserCredentials()
	const [spaceId, setSpaceId] = useState(null)
	useEffect(() => {
		if (id && userType === userTypes.ADVISER)
			getSpaceAnwers({ id, spaceId })
	}, [id, spaceId])

	return { isLoading, spaceAnswers, setSpaceId }
}

export const AdviserProvider = ({ children }) => {
	const { showToast } = useToast()

	const [state, dispatch] = useReducer(adviserReducer, adviserInitialState)

	const getSpaceAnwers = async ({ adviserId, spaceId }) => {
		dispatch({ type: ADVISER_ACTIONS.LOAD_SPACE_ANSWERS_LIST })
		try {
			const spaceAnswers = await adviserService.getSpaceAnswers({
				adviserId,
				spaceId,
			})
			dispatch({
				type: ADVISER_ACTIONS.LOAD_SPACE_ANSWERS_LIST_SUCCESS,
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
			dispatch({ type: ADVISER_ACTIONS.STOP_LOADING })
		}
	}
	return (
		<AdviserContext.Provider value={{ ...state, getSpaceAnwers }}>
			{children}
		</AdviserContext.Provider>
	)
}
