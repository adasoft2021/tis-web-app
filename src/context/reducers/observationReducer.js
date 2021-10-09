import { OBSERVATION_ACTIONS } from '../actions/ObservationActions'

export const observationInitialState = {
	observations: [],
	error: null,
	isLoading: false,
}

export const observationReducer = (state, { type, payload }) => {
	switch (type) {
		case OBSERVATION_ACTIONS.LOAD_OBSERVATIONS:
			return {
				...state,
				isLoading: true,
			}
		case OBSERVATION_ACTIONS.LOAD_OBSERVATION_SUCCESS:
			return {
				...state,
				observatios: payload,
				error: null,
				isLoading: false,
			}
		case OBSERVATION_ACTIONS.LOAD_OBSERVATION_ERROR:
			return {
				...state,
				error: payload,
				isLoading: false,
			}
		default:
			return state
	}
}
