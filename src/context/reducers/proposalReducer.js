import { PROPOSAL_ACTIONS } from '../actions/proposalActions'

export const proposalInitialState = {
	proposals: [],
	error: null,
	isLoading: false,
}

export const proposalReducer = (state, { type, payload }) => {
	switch (type) {
		case PROPOSAL_ACTIONS.LOAD_LIST_PROPOSALS:
			return {
				...state,
				isLoading: true,
			}
		case PROPOSAL_ACTIONS.LOAD_LIST_PROPOSALS_SUCCESS:
			return {
				...state,
				proposals: payload,
				error: null,
				isLoading: false,
			}
		case PROPOSAL_ACTIONS.LOAD_LIST_PROPOSALS_ERROR:
			return {
				...state,
				error: payload,
				isLoading: false,
			}
		default:
			return state
	}
}
