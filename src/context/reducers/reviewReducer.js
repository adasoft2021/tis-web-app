import * as yup from 'yup'

import { REVIEW_ACTIONS } from '../actions/reviewActions'

export const reviewInitialState = {
	review: null,
	reviews: [],
	error: null,
	isLoading: true,
	qualificationSchema: yup.object({}),
}

const getReview = ({ qualifications, ...rest }) => {
	qualifications = qualifications.sort(
		({ description: d1 }, { description: d2 }) => d2.length - d1.length
	)

	return {
		...rest,
		qualifications,
	}
}

export const createQualificationSchema = (qualifications) => {
	return yup.object({
		one: yup
			.number('El valor tiene que ser numerico')
			.min(0, 'Este campo no pude ser menor a 0')
			.max(
				qualifications[0].maxScore,
				`Este campo no puede ser mayor a ${qualifications[0].maxScore}`
			),
		two: yup
			.number()
			.min(0, 'Este campo no pude ser menor a 0')
			.max(
				qualifications[1].maxScore,
				`Este campo no puede ser mayor a ${qualifications[1].maxScore}`
			),
		three: yup
			.number()
			.min(0, 'Este campo no pude ser menor a 0')
			.max(
				qualifications[2].maxScore,
				`Este campo no puede ser mayor a ${qualifications[2].maxScore}`
			),
		four: yup
			.number()
			.min(0, 'Este campo no pude ser menor a 0')
			.max(
				qualifications[3].maxScore,
				`Este campo no puede ser mayor a ${qualifications[3].maxScore}`
			),
		five: yup
			.number()
			.min(0, 'Este campo no pude ser menor a 0')
			.max(
				qualifications[4].maxScore,
				`Este campo no puede ser mayor a ${qualifications[4].maxScore}`
			),
		six: yup
			.number()
			.min(0, 'Este campo no pude ser menor a 0')
			.max(
				qualifications[5].maxScore,
				`Este campo no puede ser mayor a ${qualifications[5].maxScore}`
			),
		seven: yup
			.number()
			.min(0, 'Este campo no pude ser menor a 0')
			.max(
				qualifications[6].maxScore,
				`Este campo no puede ser mayor a ${qualifications[6].maxScore}`
			),
		comentario: yup
			.string()
			.max(
				200,
				'El comentario no puede sobrepasar la cantidad de 200 caracteres'
			),
	})
}

export const reviewReducer = (state, { type, payload }) => {
	switch (type) {
		case REVIEW_ACTIONS.LOAD_REQUEST:
			return {
				...state,
				isLoading: true,
			}
		case REVIEW_ACTIONS.LOAD_CREATE_SUCCESS:
		case REVIEW_ACTIONS.LOAD_GET_SUCCESS:
		case REVIEW_ACTIONS.LOAD_UPDATE_SUCCESS:
			return {
				...state,
				review: getReview(payload),
				error: null,
				isLoading: false,
			}
		case REVIEW_ACTIONS.LOAD_CREATE_ERROR:
		case REVIEW_ACTIONS.LOAD_GET_ERROR:
		case REVIEW_ACTIONS.LOAD_UPDATE_ERROR:
			return {
				...state,
				error: payload,
				isLoading: false,
			}

		case REVIEW_ACTIONS.LOAD_GET_COMPANY_REVIEWS:
			return {
				...state,
				isLoading: true,
			}

		case REVIEW_ACTIONS.LOAD_GET_COMPANY_REVIEWS_SUCCESS:
			return {
				...state,
				isLoading: false,
				reviews: payload,
			}
		case REVIEW_ACTIONS.STOP_LOADING:
			return {
				...state,
				isLoading: false,
			}
		default:
			return state
	}
}
