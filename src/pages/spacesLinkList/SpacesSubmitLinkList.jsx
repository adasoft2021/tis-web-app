import DisplayLinkList from '../../components/DisplayLinkList'
import { useCompanySpaces } from '../../context/providers/SpaceContext'
import Page from '../Page'
import { SPACE_TYPE } from './SpaceType'
import { Spinner } from 'react-bootstrap'
import { useEffect, useState } from 'react'
const SpacesSubmitLinkList = () => {
	const { isLoading, spaces } = useCompanySpaces()

	const [proposalSpaces, setProposalSpaces] = useState([])
	const [deliverableSpaces, setDeliverableSpaces] = useState([])
	const [finalEvaluationSpaces, setFinalEvaluationSpaces] = useState([])
	const addProposalSpace = ({ item }) => {
		setProposalSpaces((array) => [...array, item])
	}
	const addDeliverableSpaces = ({ item }) => {
		setDeliverableSpaces((array) => [...array, item])
	}

	const addfinalEvaluationSpaces = ({ item }) => {
		setFinalEvaluationSpaces((array) => [...array, item])
	}

	useEffect(() => {
		spaces.forEach((item) => {
			if (item.spaceType === SPACE_TYPE.PROPOSALS_PRESENTATION) {
				addProposalSpace({ item })
			} else if (item.spaceType === SPACE_TYPE.PROJECT_DEVELOPMENT) {
				addDeliverableSpaces({ item })
			} else if (item.spaceType === SPACE_TYPE.FINAL_EVALUATION) {
				addfinalEvaluationSpaces({ item })
			}
		})
	}, [spaces])

	return (
		<Page>
			{isLoading ? (
				<div className='d-flex m-5 justify-content-center align-items-center'>
					<Spinner animation='border' />
				</div>
			) : (
				<div>
					<DisplayLinkList
						title='Presentación de propuestas'
						description=''
						linkList={proposalSpaces}
						emptyMessage='Aún no hay espacios para presentación de propuestas'
					/>
					<DisplayLinkList
						title='Desarrollo de proyecto'
						description=''
						linkList={deliverableSpaces}
						emptyMessage='Aún no hay espacios para Desarrollo de proyecto'
					/>
					<DisplayLinkList
						title='Evaluación final'
						description=''
						linkList={finalEvaluationSpaces}
						emptyMessage='Aún no hay espacios para Evaluación final'
					/>
				</div>
			)}
		</Page>
	)
}

export default SpacesSubmitLinkList
