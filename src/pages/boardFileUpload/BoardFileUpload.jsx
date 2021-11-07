import { Col, Spinner } from 'react-bootstrap'
import AccordionItem from '../../components/AccordionItem'
import ContextAwareToggle from '../../components/ContextAwareToggle'
import { useSpaceAnswerList } from '../../context/providers/SpaceAnswerContext'
import Page from '../Page'
import ListCard from './ListCard'

function Header({ companyName }) {
	return (
		<>
			<Col sm={8} className='border-end border-2'>
				<span className='fw-bold'>Nombre Corto: </span>
				{companyName}
			</Col>
			<Col sm={4} className='d-flex justify-content-center p-0'>
				<ContextAwareToggle eventKey='1'>
					Ver archivos adjuntos
				</ContextAwareToggle>
			</Col>
		</>
	)
}

const BoardFileUpload = ({ spaceId, spaceTitle }) => {
	const { spaceAnswers, isLoading } = useSpaceAnswerList(parseInt(spaceId))
	return (
		<Page>
			<h2>{spaceTitle}</h2>
			{isLoading ? (
				<div className='d-flex m-5 justify-content-center align-items-center'>
					<Spinner animation='border' />
				</div>
			) : (
				<>
					{spaceAnswers.length !== 0 ? (
						spaceAnswers.map((company) => (
							<AccordionItem
								header={
									<Header companyName={company.companyName} />
								}
								key={company.companyName}
								body={<ListCard files={company.files} />}
							/>
						))
					) : (
						<h4>
							Aún no hay respuesta de alguna GE a {spaceTitle}
						</h4>
					)}
				</>
			)}
		</Page>
	)
}

export default BoardFileUpload
