import Page from '../Page'
import AccordionItem from '../../components/AccordionItem'
import {
	Spinner,
	Table,
	InputGroup,
	FormControl,
	Button,
	Col,
} from 'react-bootstrap'
import { useAllCompanies } from '../../context/providers/CompanyContext'
import React, { useState } from 'react'
import { useUserCredentials } from '../../context/providers/UserCredentialsContext'
import { userTypes } from '../../context/reducers/userCredentialsReducer'
import ContextAwareToggle from '../../components/ContextAwareToggle'

function Header({ company }) {
	return (
		<>
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
			<Col sm={1} className='d-flex justify-content-center p-0'>
				<ContextAwareToggle eventKey='1'>Ver más</ContextAwareToggle>
			</Col>
		</>
	)
}

function Body({ company }) {
	return (
		<>
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
		</>
	)
}
function CompaniesAccordion({ companies }) {
	return (
		<>
			{companies.map((company) => (
				<AccordionItem
					header={<Header company={company} />}
					key={company.id}
					body={<Body company={company} />}
				/>
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
