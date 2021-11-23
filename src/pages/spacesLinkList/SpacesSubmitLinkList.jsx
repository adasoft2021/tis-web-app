import DisplayLinkList from '../../components/DisplayLinkList'
import { useCompanySpaces } from '../../context/providers/SpaceContext'
import Page from '../Page'
import { SPACE_TYPE } from './SpaceType'
import { Spinner } from 'react-bootstrap'
const SpacesSubmitLinkList = () => {
	const { isLoading, spaces } = useCompanySpaces()
	const proposalSpaces = []
	const deliverableSpaces = []
	const finalEvaluationSpaces = []

	spaces.forEach((item) => {
		if (item.spaceType === SPACE_TYPE.PROPOSAL) {
			proposalSpaces.push({ item })
		} else if (item.spaceType === SPACE_TYPE.DELIVERABLE) {
			deliverableSpaces.push({ item })
		} else if (item.spaceType === SPACE_TYPE.END_EVALUATION) {
			finalEvaluationSpaces.push({ item })
		}
	})

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
