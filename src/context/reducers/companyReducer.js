import { COMPANY_ACTIONS } from '../actions/companyActions'

export const companyInitialState = {
	company: null,
	companies: [],
	companyDTO: null,
	isLoading: false,
}

export const companyReducer = (state, { type, payload }) => {
	switch (type) {
		case COMPANY_ACTIONS.LOAD_COMPANIES_LIST:
			return {
				...state,
				isLoading: true,
			}
		case COMPANY_ACTIONS.LOAD_COMPANIES_LIST_SUCCESS:
			return {
				...state,
				companies: payload,
				isLoading: false,
			}
		case COMPANY_ACTIONS.LOAD_COMPANY:
			return {
				...state,
				isLoading: true,
			}
		case COMPANY_ACTIONS.LOAD_COMPANY_SUCCESS:
			return {
				...state,
				company: payload,
				isLoading: false,
			}
		case COMPANY_ACTIONS.STOP_LOADING:
			return {
				...state,
				isLoading: false,
			}
		case COMPANY_ACTIONS.LOAD_REGISTER_COMPANY:
			return {
				...state,
				isLoading: true,
			}
		case COMPANY_ACTIONS.LOAD_UPDATE_COMPANY:
			return {
				...state,
				isLoading: true,
			}
		case COMPANY_ACTIONS.LOAD_UPDATE_COMPANY_SUCCESS:
			return {
				...state,
				companyDTO: payload,
				isLoading: false,
			}
		default:
			return state
	}
}
