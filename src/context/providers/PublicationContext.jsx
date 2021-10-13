import { createContext, useContext, useEffect, useReducer } from 'react'

import * as publicationService from '../../services/publicationService'
import {
	publicationInitialState,
	publicationReducer,
} from '../reducers/publicationReducer'
import { PUBLICATION_ACTIONS } from '../actions/publicationActions'

const PublicationContext = createContext({
	...publicationInitialState,
	getAllAdviserPublications: async ({ adviserId, publicationType }) => {},
	deletePublication: async ({ publicationId }) => {},
})

export const usePublication = () => {
	const context = useContext(PublicationContext)

	return context
}

export const useAllAdviserPublications = ({ adviserId, publicationType }) => {
	const {
		errorPublications,
		getAllAdviserPublications,
		isLoading,
		publications,
	} = usePublication()

	useEffect(() => {
		getAllAdviserPublications({ adviserId, publicationType })
	}, [])

	return { errorPublications, isLoading, publications }
}

export const PublicationProvider = ({ children }) => {
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
		} catch ({ response: { data } }) {
			dispatch({
				type: PUBLICATION_ACTIONS.LOAD_PUBLICATIONS_LIST_ERROR,
				payload: data.message,
			})
		}
	}

	const deletePublication = async ({ publicationId }) => {
		try {
			await publicationService.deletePublication({ publicationId })
			dispatch({
				type: PUBLICATION_ACTIONS.LOAD_DELETE_PUBLICATION_SUCCESS,
				payload: publicationId,
			})
		} catch ({ response: { data } }) {
			dispatch({
				type: PUBLICATION_ACTIONS.LOAD_DELETE_PUBLICATION_ERROR,
				payload: data.message,
			})
		}
	}

	return (
		<PublicationContext.Provider
			value={{ ...state, getAllAdviserPublications, deletePublication }}
		>
			{children}
		</PublicationContext.Provider>
	)
}
