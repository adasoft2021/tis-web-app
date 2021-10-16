import { createContext, useContext, useEffect, useReducer } from 'react'

import * as publicationService from '../../services/publicationService'
import {
	publicationInitialState,
	publicationReducer,
} from '../reducers/publicationReducer'
import { PUBLICATION_ACTIONS } from '../actions/publicationActions'
import { useToast } from './ToastContext'

const PublicationContext = createContext({
	...publicationInitialState,
	getAllAdviserPublications: async ({ adviserId, publicationType }) => {},
	deletePublication: async ({ publicationId }) => {},
	loadPublicationToUpdate: ({ publicationDTO }) => {},
	resetPublicationDTO: () => {},
	updatePublication: async ({ publicationId, publicationDTO }) => {},
})

export const usePublication = () => {
	const context = useContext(PublicationContext)

	return context
}

export const useAllAdviserPublications = ({ adviserId, publicationType }) => {
	const { getAllAdviserPublications, isLoading, publications } =
		usePublication()

	useEffect(() => {
		getAllAdviserPublications({
			adviserId,
			publicationType: publicationType.substring(
				0,
				publicationType.length - 1
			),
		})
	}, [])

	return { isLoading, publications }
}

export const PublicationProvider = ({ children }) => {
	const { showToast } = useToast()

	const [state, dispatch] = useReducer(
		publicationReducer,
		publicationInitialState
	)

	const getAllAdviserPublications = async ({
		adviserId,
		publicationType,
	}) => {
		dispatch({ type: PUBLICATION_ACTIONS.LOAD_PUBLICATIONS_LIST })
		try {
			const publications =
				await publicationService.getAllAdviserPublications({
					adviserId,
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
			await publicationService.deletePublication({ publicationId })
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
			dispatch({ type: PUBLICATION_ACTIONS.STOP_LOADING })
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
		try {
			const publication = await publicationService.updatePublication({
				publicationId,
				publicationDTO,
			})
			dispatch({
				type: PUBLICATION_ACTIONS.LOAD_UPDATE_PUBLICATION_SUCCESS,
				payload: { publicationId, publicationDTO: publication },
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
			}}
		>
			{children}
		</PublicationContext.Provider>
	)
}