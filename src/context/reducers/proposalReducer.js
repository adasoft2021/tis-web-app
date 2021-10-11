import { PROPOSAL_ACTIONS } from '../actions/proposalActions'

export const proposalInitialState = {
	proposal: null,
	error: null,
	isLoading: false,
}

export const proposalReducer = (state, { type, payload }) => {
	switch (type) {
		case PROPOSAL_ACTIONS.LOAD_GET_PROPOSAL:
			return {
				...state,
				isLoading: true,
			}
		case PROPOSAL_ACTIONS.LOAD_GET_PROPOSAL_SUCCESS:
			return {
				...state,
				proposal: payload,
				error: null,
				isLoading: false,
			}
		case PROPOSAL_ACTIONS.LOAD_GET_PROPOSAL_ERROR:
			return {
				...state,
				error: payload,
				isLoading: false,
			}
		default:
			return state
	}
}
