import { createContext, useContext, useEffect, useReducer } from 'react'
import * as proposalService from '../../services/proposalService'
import { PROPOSAL_ACTIONS } from '../actions/proposalActions'
import {
	proposalInitialState,
	proposalReducer,
} from '../reducers/proposalReducer'

export const ProposalContext = createContext({
	...proposalInitialState,
	getProposal: async ({ proposalId }) => {},
})

export function useProposal() {
	const context = useContext(ProposalContext)

	return context
}

export function useProposalById(proposalId) {
	const { error, getProposal, isLoading, proposal } = useProposal()

	useEffect(async () => {
		getProposal({ proposalId })
	}, [])

	return { error, isLoading, proposal }
}

export const ProposalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(proposalReducer, proposalInitialState)

	const getProposal = async ({ proposalId }) => {
		dispatch({ type: PROPOSAL_ACTIONS.LOAD_GET_PROPOSAL })
		try {
			const proposal = await proposalService.getProposal({ proposalId })
			dispatch({
				type: PROPOSAL_ACTIONS.LOAD_GET_PROPOSAL_SUCCESS,
				payload: proposal,
			})
		} catch ({ response: { data, status }, ...rest }) {
			dispatch({
				type: PROPOSAL_ACTIONS.LOAD_GET_PROPOSAL_ERROR,
				payload:
					status < 500
						? data.message
						: 'Ocurrió algún error con el servidor. Intente más tarde.',
			})
		}
	}

	return (
		<ProposalContext.Provider value={{ ...state, getProposal }}>
			{children}
		</ProposalContext.Provider>
	)
}
