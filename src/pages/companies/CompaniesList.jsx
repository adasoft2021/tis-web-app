import Page from '../Page'
import CompanyItem from '../../components/CompanyItem'
import {
	Spinner,
	Table,
	InputGroup,
	FormControl,
	Button,
} from 'react-bootstrap'
import { useAllCompanies } from '../../context/providers/CompanyContext'
import React, { useState } from 'react'
import { useUserCredentials } from '../../context/providers/UserCredentialsContext'
import { userTypes } from '../../context/reducers/userCredentialsReducer'

function CompaniesAccordion({ companies }) {
	return (
		<>
			{companies.map((company) => (
				<CompanyItem company={company} key={company.id} />
			))}
		</>
	)
}

function serchingTerm(term) {
	return function (x) {
		return x.name.toLowerCase().includes(term) || !term
	}
}

function CompaniesGE({ dataList }) {
	const [term, setTerm] = useState('')
	return (
		<div>
			{dataList.length && (
				<InputGroup className='mb-3'>
					<FormControl
						placeholder='Buscar'
						aria-label='Buscar'
						name='term'
						aria-describedby='basic-addon2'
						onChange={(e) => setTerm(e.target.value)}
						maxLength='10'
					/>
					<Button variant='outline-secondary' id='button-addon2'>
						Buscar
					</Button>
				</InputGroup>
			)}
			<Table>
				<thead>
					<tr>
						<th>Nombre de G.E.</th>
						<th>Nombre Largo</th>
						<th>Tipo de Sociedad</th>
					</tr>
				</thead>
				<tbody>
					{dataList.filter(serchingTerm(term)).map((element) => (
						<tr key={element.id}>
							<td>{element.shortname}</td>
							<td>{element.name}</td>
							<td>{element.companyType}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	)
}
export default function CompaniesList({ title = 'Lista de GE' }) {
	const { userType } = useUserCredentials()
	const { isLoading, companies } = useAllCompanies()

	return (
		<Page>
			<h1>{title}</h1>
			{isLoading ? (
				<div className='d-flex m-5 justify-content-center align-items-center'>
					<Spinner animation='border' />
				</div>
			) : userType === userTypes.ADVISER ? (
				<CompaniesAccordion companies={companies} />
			) : (
				<CompaniesGE dataList={companies} />
			)}
		</Page>
	)
}
