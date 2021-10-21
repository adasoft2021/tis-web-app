import Page from '../Page'
import CompanyItem from '../../components/CompanyItem'
import { Spinner } from 'react-bootstrap'
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
		<>
			{companies.map((company) => (
				<CompanyItem company={company} key={company.id} />
			))}
		</>
	)
}

export default function CompaniesList({ title = 'Lista de GE' }) {
	return (
		<Page>
			<CompanyProvider>
				<h1>{title}</h1>
				<CompaniesAccordion />
			</CompanyProvider>
		</Page>
	)
}
