import { PUBLICATION_ACTIONS } from '../actions/publicationActions'

export const publicationInitialState = {
	publications: [],
	publicationDTO: null,
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
				isLoading: false,
			}
		case PUBLICATION_ACTIONS.LOAD_DELETE_PUBLICATION_SUCCESS:
			return {
				...state,
				publications: state.publications.filter(
					({ id }) => id !== payload
				),
			}
		case PUBLICATION_ACTIONS.STOP_LOADING:
			return {
				...state,
				isLoading: false,
			}
		case PUBLICATION_ACTIONS.LOAD_UPDATE_PUBLICATION:
			return {
				...state,
				publicationDTO: payload,
			}
		case PUBLICATION_ACTIONS.LOAD_UPDATE_PUBLICATION_SUCCESS:
			return {
				...state,
				publications: state.publications.map((publication) => {
					if (publication.id === payload.publicationId) {
						return payload.publicationDTO
					}
					return publication
				}),
			}
		case PUBLICATION_ACTIONS.RESET_PUBLICATION_DTO:
			return {
				...state,
				publicationDTO: null,
			}
		case PUBLICATION_ACTIONS.LOAD_CREATE_PUBLICATION_SUCCESS:
			return {
				...state,
				publications: [...state.publications, payload],
			}
		default:
			return state
	}
}
