import { createContext, useContext, useEffect, useReducer } from 'react'
import * as proposalService from '../../services/proposalService'
import { PROPOSAL_ACTIONS } from '../actions/proposalActions'
import {
	proposalInitialState,
	proposalReducer,
} from '../reducers/proposalReducer'

export const ProposalContext = createContext({
	...proposalInitialState,
	getAllAdviserProposals: async (adviserId) => adviserId,
	getProposal: async (proposalId) => proposalId,
})

export const useProposal = () => {
	const context = useContext(ProposalContext)
	return context
}

export const useListProposals = () => {
	const { error, getAllAdviserProposals, isLoading, proposals } =
		useProposal()

	useEffect(() => {
		getAllAdviserProposals(1)
	}, [])

	return { error, isLoading, proposals }
}

export const ProposalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(proposalReducer, proposalInitialState)

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

	const getProposal = async (proposalId) => {
		dispatch({ type: PROPOSAL_ACTIONS.LOAD_PROPOSAL })
		try {
			const proposal = await proposalService.getProposal(proposalId)
			dispatch({
				type: PROPOSAL_ACTIONS.LOAD_PROPOSAL_SUCCESS,
				payload: proposal,
			})
		} catch ({ response: { data } }) {
			dispatch({
				type: PROPOSAL_ACTIONS.LOAD_PROPOSAL_ERROR,
				payload: data,
			})
		}
	}

	return (
		<ProposalContext.Provider
			value={{ ...state, getAllAdviserProposals, getProposal }}
		>
			{children}
		</ProposalContext.Provider>
	)
}
