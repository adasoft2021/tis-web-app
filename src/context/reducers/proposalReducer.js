import { PROPOSAL_ACTIONS, PROPOSALS_ACTIONS } from '../actions/proposalActions'

export const proposalsInitialState = {
	proposals: [],
	error: null,
	isLoading: false,
}

export const proposalsReducer = (state, { type, payload }) => {
	switch (type) {
		case PROPOSALS_ACTIONS.LOAD_LIST_PROPOSALS:
			return {
				...state,
				isLoading: true,
			}
		case PROPOSALS_ACTIONS.LOAD_LIST_PROPOSALS_SUCCESS:
			return {
				...state,
				proposals: payload,
				error: null,
				isLoading: false,
			}
		case PROPOSALS_ACTIONS.LOAD_LIST_PROPOSALS_ERROR:
			return {
				...state,
				error: payload,
				isLoading: false,
			}
	}
}
export const proposalInitialState = {
	proposal: null,
	error: null,
	isLoading: false,
}
export const proposalReducer = (state, { type, payload }) => {
	switch (type) {
		case PROPOSAL_ACTIONS.LOAD_PROPOSAL:
			return {
				...state,
				isLoading: true,
			}
		case PROPOSAL_ACTIONS.LOAD_GET_SUCCESS:
			return {
				...state,
				proposal: payload,
				error: null,
				isLoading: false,
			}
		case PROPOSAL_ACTIONS.LOAD_GET_ERROR:
			return {
				...state,
				error: payload,
				isLoading: false,
			}
		default:
			return state
	}
}
