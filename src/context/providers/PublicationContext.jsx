import { createContext, useContext, useEffect, useReducer } from 'react'

import * as publicationService from '../../services/publicationService'
import {
	publicationInitialState,
	publicationReducer,
} from '../reducers/publicationReducer'
import { PUBLICATION_ACTIONS } from '../actions/publicationActions'
import { useToast } from './ToastContext'
import { useUserCredentials } from './UserCredentialsContext'
import { userTypes } from '../reducers/userCredentialsReducer'

const PublicationContext = createContext({
	...publicationInitialState,
	getAllAdviserPublications: async ({ adviserId, publicationType }) => {},
	deletePublication: async ({ publicationId }) => {},
	loadPublicationToUpdate: ({ publicationDTO }) => {},
	resetPublicationDTO: () => {},
	updatePublication: async ({ publicationId, publicationDTO }) => {},
	createPublication: async ({ publicationDTO }) => {},
	getPublishedPublications: async ({ publicationType }) => {},
	getPublicationHistory: async ({ publicationType }) => {},
})

export const usePublication = () => {
	const context = useContext(PublicationContext)

	return context
}

export const useAllAdviserPublications = (publicationType) => {
	const {
		getAllAdviserPublications,
		getPublishedPublications,
		isLoading,
		publications,
	} = usePublication()
	const { userType } = useUserCredentials()

	useEffect(() => {
		if (userType === userTypes.ADVISER) {
			getAllAdviserPublications({
				publicationType: publicationType.substring(
					0,
					publicationType.length - 1
				),
			})
		} else {
			getPublishedPublications({
				publicationType: publicationType.substring(
					0,
					publicationType.length - 1
				),
			})
		}
	}, [userType])

	return { isLoading, publications }
}

export const usePublicationHistory = (publicationType) => {
	const { getPublicationHistory, publications, isLoading } = usePublication()
	useEffect(() => {
		getPublicationHistory({ publicationType })
	}, [])
	return { isLoading, publications }
}
export const PublicationProvider = ({ children }) => {
	const { showToast } = useToast()
	const { id, token } = useUserCredentials()

	const [state, dispatch] = useReducer(
		publicationReducer,
		publicationInitialState
	)

	const getAllAdviserPublications = async ({ publicationType }) => {
		dispatch({ type: PUBLICATION_ACTIONS.LOAD_PUBLICATIONS_LIST })
		try {
			const publications =
				await publicationService.getAllAdviserPublications({
					token,
					adviserId: id,
					publicationType,
				})
			dispatch({
				type: PUBLICATION_ACTIONS.LOAD_PUBLICATIONS_LIST_SUCCESS,
				payload: publications,
			})
		} catch ({
			response: {
				data: { message },
				status,
			},
		}) {
			showToast({
				color: 'danger',
				message:
					status < 500
						? message
						: 'Ocurrió algún error con el servidor. Intente más tarde.',
			})
			dispatch({ type: PUBLICATION_ACTIONS.STOP_LOADING })
		}
	}

	const deletePublication = async ({ publicationId }) => {
		try {
			await publicationService.deletePublication({ token, publicationId })
			dispatch({
				type: PUBLICATION_ACTIONS.LOAD_DELETE_PUBLICATION_SUCCESS,
				payload: publicationId,
			})
			showToast({
				color: 'success',
				message: 'La publicación se eliminó correctamente.',
			})
		} catch ({
			response: {
				data: { message },
				status,
			},
		}) {
			showToast({
				color: 'danger',
				message:
					status < 500
						? message
						: 'Ocurrió algún error con el servidor. Intente más tarde.',
			})
		}
	}

	const loadPublicationToUpdate = ({ publicationDTO }) => {
		dispatch({
			type: PUBLICATION_ACTIONS.LOAD_UPDATE_PUBLICATION,
			payload: publicationDTO,
		})
	}

	const resetPublicationDTO = () => {
		dispatch({ type: PUBLICATION_ACTIONS.RESET_PUBLICATION_DTO })
	}

	const updatePublication = async ({ publicationId, publicationDTO }) => {
		showToast({
			color: 'info',
			message: 'Su solicitud está siendo procesada...',
		})
		try {
			const publication = await publicationService.updatePublication({
				token,
				publicationId,
				publicationDTO,
			})
			dispatch({
				type: PUBLICATION_ACTIONS.LOAD_UPDATE_PUBLICATION_SUCCESS,
				payload: { publicationId, publicationDTO: publication },
			})
			showToast({
				color: 'success',
				message: 'Guardada exitosamente',
			})
		} catch ({
			response: {
				data: { message },
				status,
			},
		}) {
			showToast({
				color: 'danger',
				message:
					status < 500
						? message
						: 'Ocurrió algún error con el servidor. Intente más tarde.',
			})
		}
	}

	const createPublication = async ({ publicationDTO }) => {
		showToast({
			color: 'info',
			message: 'Su solicitud está siendo procesada...',
		})
		try {
			const publication = await publicationService.createPublication({
				token,
				publicationDTO,
			})
			dispatch({
				type: PUBLICATION_ACTIONS.LOAD_CREATE_PUBLICATION_SUCCESS,
				payload: publication,
			})
			showToast({
				color: 'success',
				message: 'Creada exitosamente',
			})
		} catch ({ response: { data, status } }) {
			showToast({
				color: 'danger',
				message:
					status < 500
						? data.message
						: 'Ocurrió algún error con el servidor. Intente más tarde.',
			})
		}
	}

	const getPublishedPublications = async ({ publicationType }) => {
		dispatch({ type: PUBLICATION_ACTIONS.LOAD_PUBLICATIONS_LIST })
		try {
			const publications =
				await publicationService.getPublishedPublications({
					publicationType,
				})
			dispatch({
				type: PUBLICATION_ACTIONS.LOAD_PUBLICATIONS_LIST_SUCCESS,
				payload: publications,
			})
		} catch ({
			response: {
				data: { message },
				status,
			},
		}) {
			showToast({
				color: 'danger',
				message:
					status < 500
						? message
						: 'Ocurrió algún error con el servidor. Intente más tarde.',
			})
			dispatch({ type: PUBLICATION_ACTIONS.STOP_LOADING })
		}
	}
	const getPublicationHistory = async ({ publicationType }) => {
		dispatch({ type: PUBLICATION_ACTIONS.LOAD_PUBLICATIONS_LIST })
		try {
			const publications = await publicationService.getPublicationHistory(
				{
					adviserId: id,
					token,
					publicationType,
				}
			)
			dispatch({
				type: PUBLICATION_ACTIONS.LOAD_PUBLICATIONS_LIST_SUCCESS,
				payload: publications,
			})
		} catch ({
			response: {
				data: { message },
				status,
			},
		}) {
			showToast({
				color: 'danger',
				message:
					status < 500
						? message
						: 'Ocurrió algún error con el servidor. Intente más tarde.',
			})
			dispatch({ type: PUBLICATION_ACTIONS.STOP_LOADING })
		}
	}

	return (
		<PublicationContext.Provider
			value={{
				...state,
				getAllAdviserPublications,
				deletePublication,
				loadPublicationToUpdate,
				resetPublicationDTO,
				updatePublication,
				createPublication,
				getPublishedPublications,
				getPublicationHistory,
			}}
		>
			{children}
		</PublicationContext.Provider>
	)
}
