import { PUBLICATION_ACTIONS } from '../actions/publicationActions'

export const publicationInitialState = {
	publications: [],
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
				errorPublications: null,
				isLoading: false,
			}
		case PUBLICATION_ACTIONS.LOAD_DELETE_PUBLICATION_SUCCESS:
			return {
				...state,
				publications: state.publications.filter(
					({ id }) => id !== payload
				),
				errorDeletePublication: null,
			}
		case PUBLICATION_ACTIONS.STOP_LOADING:
			return {
				...state,
				isLoading: false,
			}
		default:
			return state
	}
}
