import { PUBLICATION_ACTIONS } from '../actions/publicationActions'

export const publicationInitialState = {
	publications: [],
	error: null,
	isLoading: false,
}

export const publicationReducer = (state, { type, payload }) => {
	switch (type) {
		case PUBLICATION_ACTIONS.LOAD_PUBLICATIONS_LIST:
			return {
				...state,
				isLoading: true,
			}
		case PUBLICATION_ACTIONS.LOAD_PUBLICATIONS_LIST_SUCCESS:
			return {
				...state,
				publications: payload,
				error: null,
				isLoading: false,
			}
		case PUBLICATION_ACTIONS.LOAD_PUBLICATIONS_LIST_ERROR:
			return {
				...state,
				error: payload,
			}
		default:
			return state
	}
}
