import { PUBLICATION_ACTIONS } from '../actions/publicationActions'

export const publicationInitialState = {
	publications: [],
	errorPublications: null,
	errorDeletePublication: null,
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
		case PUBLICATION_ACTIONS.LOAD_PUBLICATIONS_LIST_ERROR:
			return {
				...state,
				errorPublications: payload,
			}
		case PUBLICATION_ACTIONS.LOAD_DELETE_PUBLICATION_SUCCESS:
			return {
				...state,
				publications: state.publications.filter(
					({ id }) => id !== payload
				),
				errorDeletePublication: null,
			}
		case PUBLICATION_ACTIONS.LOAD_DELETE_PUBLICATION_ERROR:
			return {
				...state,
				errorDeletePublication: payload,
			}
		default:
			return state
	}
}
