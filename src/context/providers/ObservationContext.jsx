import { createContext, useContext, useEffect, useReducer } from 'react'
import * as observationService from '../../services/observationService'
import { OBSERVATION_ACTIONS } from '../actions/observationActions'
import {
	observationInitialState,
	observationReducer,
} from '../reducers/observationReducer'

export const ObservationContext = createContext({
	...observationInitialState,
	createObservation: async ({ proposalId, observationDTO }) => {},
	deleteObservation: async ({ observationId }) => {},
	getAllProposalObservations: async ({ proposalId }) => {},
	updateObservation: async ({ observationId, observationDTO }) => {},
})

export const useObservation = () => {
	const context = useContext(ObservationContext)

	return context
}

export const useObservationsList = (proposalId) => {
	const {
		errorObservationList,
		getAllProposalObservations,
		isLoadingObservationsList,
		observations,
	} = useObservation()

	useEffect(() => {
		getAllProposalObservations({ proposalId })
	}, [])

	return {
		errorObservationList,
		isLoadingObservationsList,
		observations,
	}
}

export const ObservationProvider = ({ children }) => {
	const [state, dispatch] = useReducer(
		observationReducer,
		observationInitialState
	)

	const createObservation = async ({ proposalId, observationDTO }) => {
		dispatch({ type: OBSERVATION_ACTIONS.LOAD_CREATE })
		try {
			const observation = await observationService.createObservation({
				proposalId,
				observationDTO,
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
		dispatch({ type: OBSERVATION_ACTIONS.LOAD_DELETE })
		try {
			await observationService.deleteObservation({
				observationId,
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

	const getAllProposalObservations = async ({ proposalId }) => {
		dispatch({ type: OBSERVATION_ACTIONS.LOAD_OBSERVATIONS_LIST })
		try {
			const observations =
				await observationService.getAllProposalObservations({
					proposalId,
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
		dispatch({ type: OBSERVATION_ACTIONS.LOAD_UPDATE })
		try {
			const observation = await observationService.updateObservation({
				observationId,
				observationDTO,
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
				getAllProposalObservations,
				updateObservation,
			}}
		>
			{children}
		</ObservationContext.Provider>
	)
}
