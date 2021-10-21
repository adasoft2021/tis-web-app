import Page from '../Page'
import CompanyItem from '../../components/CompanyItem'
import { Spinner, Accordion } from 'react-bootstrap'
import {
	CompanyProvider,
	useAllCompanies,
} from '../../context/providers/CompanyContext'

function CompaniesAccordion() {
	const { isLoading, companies } = useAllCompanies()

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
