import { OBSERVATION_ACTIONS } from '../actions/observationActions'

export const observationInitialState = {
	observations: [],
	errorCreate: null,
	errorDelete: null,
	errorUpdate: null,
	errorObservationList: null,
	isLoadingCreate: false,
	isLoadingDelete: false,
	isLoadingUpdate: false,
	isLoadingObservationsList: false,
}

export const observationReducer = (state, { type, payload }) => {
	switch (type) {
		case OBSERVATION_ACTIONS.LOAD_CREATE:
			return {
				...state,
				isLoadingCreate: true,
			}
		case OBSERVATION_ACTIONS.LOAD_CREATE_SUCCESS:
			return {
				...state,
				observations: [...state.observations, payload],
				errorCreate: null,
				isLoadingCreate: false,
			}
		case OBSERVATION_ACTIONS.LOAD_CREATE_ERROR:
			return {
				...state,
				errorCreate: payload,
				isLoadingCreate: false,
			}
		case OBSERVATION_ACTIONS.LOAD_DELETE:
			return {
				...state,
				isLoadingDelete: true,
			}
		case OBSERVATION_ACTIONS.LOAD_DELETE_SUCCESS:
			return {
				...state,
				observations: state.observations.filter(
					(observation) => observation.id !== payload
				),
				errorDelete: null,
				isLoadingDelete: false,
			}
		case OBSERVATION_ACTIONS.LOAD_DELETE_ERROR:
			return {
				...state,
				errorDelete: payload,
				isLoadingDelete: false,
			}
		case OBSERVATION_ACTIONS.LOAD_UPDATE:
			return {
				...state,
				isLoadingUpdate: true,
			}
		case OBSERVATION_ACTIONS.LOAD_UPDATE_SUCCESS:
			return {
				...state,
				observations: state.observations.map((observation) => {
					if (observation.id === payload.id) {
						return payload
					}
					return observation
				}),
				errorUpdate: null,
				isLoadingUpdate: false,
			}
		case OBSERVATION_ACTIONS.LOAD_UPDATE_ERROR:
			return {
				...state,
				errorUpdate: payload,
				isLoadingUpdate: false,
			}
		case OBSERVATION_ACTIONS.LOAD_OBSERVATIONS_LIST:
			return {
				...state,
				isLoadingObservationsList: true,
			}
		case OBSERVATION_ACTIONS.LOAD_OBSERVATIONS_LIST_SUCCESS:
			return {
				...state,
				observations: payload.sort((ob1, ob2) => ob1.id - ob2.id),
				errorObservationList: null,
				isLoadingObservationsList: false,
			}
		case OBSERVATION_ACTIONS.LOAD_OBSERVATIONS_LIST_ERROR:
			return {
				...state,
				errorObservationList: payload,
				isLoadingObservationsList: false,
			}
		default:
			return state
	}
}
