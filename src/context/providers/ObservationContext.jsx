import { createContext, useContext, useEffect, useReducer } from 'react'
import * as observationService from '../../services/observationService'
import { OBSERVATION_ACTIONS } from '../actions/observationActions'
import {
	observationInitialState,
	observationReducer,
} from '../reducers/observationReducer'
import { useToast } from './ToastContext'
import { useUserCredentials } from './UserCredentialsContext'

export const ObservationContext = createContext({
	...observationInitialState,
	createObservation: async ({ observationDTO }) => {},
	deleteObservation: async ({ observationId }) => {},
	getAllReviewObservations: async ({ reviewId }) => {},
	updateObservation: async ({ observationId, observationDTO }) => {},
})

export const useObservation = () => {
	const context = useContext(ObservationContext)

	return context
}

export const useObservationsList = (reviewId) => {
	const {
		errorObservationList,
		getAllReviewObservations,
		isLoadingObservationsList,
		observations,
	} = useObservation()

	useEffect(() => {
		getAllReviewObservations({ reviewId })
	}, [])

	return {
		errorObservationList,
		isLoadingObservationsList,
		observations,
	}
}

export const ObservationProvider = ({ children }) => {
	const { showToast } = useToast()
	const { token } = useUserCredentials()
	const [state, dispatch] = useReducer(
		observationReducer,
		observationInitialState
	)

	const createObservation = async ({ observationDTO }) => {
		showToast({
			color: 'info',
			message: 'Su solicitud está siendo procesada',
		})
		dispatch({ type: OBSERVATION_ACTIONS.LOAD_CREATE })
		try {
			const observation = await observationService.createObservation({
				token,
				observationDTO,
			})
			showToast({
				color: 'success',
				message: 'La observación fue creada con éxito',
			})
			dispatch({
				type: OBSERVATION_ACTIONS.LOAD_CREATE_SUCCESS,
				payload: observation,
			})
		} catch ({ response: { data, status } }) {
			dispatch({
				type: OBSERVATION_ACTIONS.LOAD_CREATE_ERROR,
				payload:
					status < 500
						? data.message
						: 'Ocurrió algún error con el servidor. Intente más tarde.',
			})
		}
	}

	const deleteObservation = async ({ observationId }) => {
		showToast({
			color: 'info',
			message: 'Su solicitud está siendo procesada',
		})
		dispatch({ type: OBSERVATION_ACTIONS.LOAD_DELETE })
		try {
			await observationService.deleteObservation({
				token,
				observationId,
			})
			showToast({
				color: 'success',
				message: 'La observación fue eliminada con éxito',
			})
			dispatch({
				type: OBSERVATION_ACTIONS.LOAD_DELETE_SUCCESS,
				payload: observationId,
			})
		} catch ({ response: { data, status } }) {
			dispatch({
				type: OBSERVATION_ACTIONS.LOAD_DELETE_ERROR,
				payload:
					status < 500
						? data.message
						: 'Ocurrió algún error con el servidor. Intente más tarde.',
			})
		}
	}

	const getAllReviewObservations = async ({ reviewId }) => {
		dispatch({ type: OBSERVATION_ACTIONS.LOAD_OBSERVATIONS_LIST })
		try {
			const observations =
				await observationService.getAllReviewObservations({
					token,
					reviewId,
				})
			dispatch({
				type: OBSERVATION_ACTIONS.LOAD_OBSERVATIONS_LIST_SUCCESS,
				payload: observations,
			})
		} catch ({ response: { data, status } }) {
			dispatch({
				type: OBSERVATION_ACTIONS.LOAD_OBSERVATIONS_LIST_ERROR,
				payload:
					status < 500
						? data.message
						: 'Ocurrió algún error con el servidor. Intente más tarde.',
			})
		}
	}

	const updateObservation = async ({ observationId, observationDTO }) => {
		showToast({
			color: 'info',
			message: 'Su solicitud está siendo procesada',
		})
		dispatch({ type: OBSERVATION_ACTIONS.LOAD_UPDATE })
		try {
			const observation = await observationService.updateObservation({
				token,
				observationId,
				observationDTO,
			})
			showToast({
				color: 'success',
				message: 'La observación fue actualizada con éxito',
			})
			dispatch({
				type: OBSERVATION_ACTIONS.LOAD_UPDATE_SUCCESS,
				payload: observation,
			})
		} catch ({ response: { data, status } }) {
			dispatch({
				type: OBSERVATION_ACTIONS.LOAD_UPDATE_ERROR,
				payload:
					status < 500
						? data.message
						: 'Ocurrió algún error con el servidor. Intente más tarde.',
			})
		}
	}

	return (
		<ObservationContext.Provider
			value={{
				...state,
				createObservation,
				deleteObservation,
				getAllReviewObservations,
				updateObservation,
			}}
		>
			{children}
		</ObservationContext.Provider>
	)
}
