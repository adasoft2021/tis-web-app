import { Col } from 'react-bootstrap'
import AccordionItem from '../../components/AccordionItem'
import ContextAwareToggle from '../../components/ContextAwareToggle'
import Page from '../Page'
import ListCard from './ListCard'

const companies = []
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

const BoardFileUpload = ({ title }) => {
	return (
		<Page>
			<h2>{title}</h2>
			{companies.length !== 0 ? (
				companies.map((company) => (
					<AccordionItem
						header={<Header companyName={company.companyName} />}
						key={company.companyName}
						body={<ListCard files={company.files} />}
					/>
				))
			) : (
				<h4>Aún no hay respuesta de alguna GE a {title}</h4>
			)}
		</Page>
	)
}

export default BoardFileUpload
