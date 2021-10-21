import {
	Accordion,
	Card,
	useAccordionButton,
	AccordionContext,
	Row,
	Col,
} from 'react-bootstrap'
import { useContext } from 'react'
import styles from './CompanyItem.module.scss'

function ContextAwareToggle({ children, eventKey, callback }) {
	const { activeEventKey } = useContext(AccordionContext)

	const decoratedOnClick = useAccordionButton(
		eventKey,
		() => callback && callback(eventKey)
	)

	const isCurrentEventKey = activeEventKey === eventKey

	return (
		<button
			className={`text-light  ${
				isCurrentEventKey ? styles.active : styles.more
			}`}
			type='button'
			onClick={decoratedOnClick}
		>
			{children}
		</button>
	)
}

export default function CompanyItem({ company }) {
	return (
		<Accordion defaultActiveKey='0'>
			<Card>
				<Card.Header>
					<Row>
						<Col sm={4} className='border-end border-2'>
							<span className='fw-bold'>Nom. Corto: </span>
							{company.shortname}
						</Col>
						<Col sm={5} className='border-end border-2'>
							<span className='fw-bold'>Nom. Largo: </span>
							{company.name}
						</Col>
						<Col sm={2} className='border-end border-2'>
							<span className='fw-bold'>Sociedad: </span>
							{company.companyType}
						</Col>
						<Col
							sm={1}
							className='d-flex justify-content-center p-0'
						>
							<ContextAwareToggle eventKey='1'>
								Ver más
							</ContextAwareToggle>
						</Col>
					</Row>
				</Card.Header>
				<Accordion.Collapse eventKey='1'>
					<Card.Body>
						<Row>
							<Col sm={4}>
								<span className='fw-bold'>Socios: </span>
								<ol>
									{company.partners.map((partner, i) => (
										<li key={i}>{partner}</li>
									))}
								</ol>
							</Col>
							<Col sm={5}>
								<span className='fw-bold'>Dirección: </span>
								{company.address}
							</Col>
							<Col sm={3}>
								<span className='fw-bold'>Correo: </span>
								{company.email}
							</Col>
						</Row>
					</Card.Body>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	)
}
