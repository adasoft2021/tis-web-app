import { createContext, useContext, useEffect, useReducer } from 'react'
import * as proposalService from '../../services/proposalService'
import { PROPOSAL_ACTIONS } from '../actions/proposalActions'
import {
	proposalsInitialState,
	proposalsReducer,
	proposalInitialState,
} from '../reducers/proposalReducer'

export const ProposalContext = createContext({
	...proposalsInitialState,
	getAllAdviserProposals: async () => {},
	proposalInitialState,
	getProposal: async () => {},
})

export const useProposal = () => {
	const context = useContext(ProposalContext)
	return context
}

export const useListProposals = () => {
	const { error, getAllAdviserProposals, isLoading, proposals } =
		useProposal()

	useEffect(() => {
		getAllAdviserProposals()
	}, [])

	return { error, isLoading, proposals }
}

export const ProposalsProvider = ({ children }) => {
	const [state, dispatch] = useReducer(
		proposalsReducer,
		proposalsInitialState
	)

	const getAllAdviserProposals = async () => {
		dispatch({ type: PROPOSAL_ACTIONS.LOAD_LIST_PROPOSALS })
		try {
			const proposals = await proposalService.getAllAdviserProposals()
			dispatch({
				type: PROPOSAL_ACTIONS.LOAD_LIST_PROPOSALS_SUCCESS,
				payload: proposals,
			})
		} catch ({ response: { data } }) {
			dispatch({
				type: PROPOSAL_ACTIONS.LOAD_LIST_PROPOSALS_ERROR,
				payload: data,
			})
		}
	}

	return (
		<ProposalContext.Provider value={{ ...state, getAllAdviserProposals }}>
			{children}
		</ProposalContext.Provider>
	)
}
