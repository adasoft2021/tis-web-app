import Page from '../Page'
import Accordion from 'react-bootstrap/Accordion'
import { Spinner } from 'react-bootstrap'
import {
	CompanyProvider,
	useAllCompanies,
} from '../../context/providers/CompanyContext'
import { useEffect } from 'react'

function CompanyItem({ company }) {
	return (
		<Accordion.Item eventKey='1'>
			<Accordion.Header>
				<ul className='list-group list-group-horizontal list-group-flush'>
					<li className='list-group-item'>{company.name}</li>
					<li className='list-group-item'>{company.shortName}</li>
					<li className='list-group-item'>{company.companyType}</li>
				</ul>
			</Accordion.Header>
			<Accordion.Body>
				<ul className='list-group list-group-horizontal list-group-flush'>
					<li className='list-group-item'>{company.address}</li>
					<li className='list-group-item'>{company.email}</li>
					<ul className='list-group list-group-flush'>
						{company.partners.map((partner, i) => (
							<li className='list-group-item' key={i}>
								{partner}
							</li>
						))}
					</ul>
				</ul>
			</Accordion.Body>
		</Accordion.Item>
	)
}
function CompaniesAccordion() {
	const { isLoading, companies } = useAllCompanies()

	useEffect(() => {
		console.log(companies)
	}, [])

	if (isLoading) {
		return (
			<div className='d-flex m-5 justify-content-center align-items-center'>
				<Spinner animation='border' />
			</div>
		)
	}
	return (
		<Accordion>
			{companies.map((company) => (
				<CompanyItem company={company} key={company.id} />
			))}
		</Accordion>
	)
}

export default function CompaniesList({ title = 'Lista de GE' }) {
	return (
		<Page>
			<CompanyProvider>
				<h1>{title}</h1>
				<Accordion>
					<CompaniesAccordion />
				</Accordion>
			</CompanyProvider>
		</Page>
	)
}
