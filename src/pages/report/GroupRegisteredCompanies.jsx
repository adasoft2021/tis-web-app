import React from 'react'
import { Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Page from '../Page'
import './GroupRegisteredCompanies.scss'
import { useActualCompanies } from '../../context/providers/CompanyContext'
function GroupRegisteredCompanies() {
	const { companies } = useActualCompanies()

	return (
		<Page>
			<h3 style={{ fontWeight: '700' }}>
				Reportes de Grupo Empresas incritas en la Gestion Actual
			</h3>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Gestion Actual</th>
						<th>Cantidad de GE</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Semestre 2-2021</td>
						<td>{companies.length}</td>
					</tr>
				</tbody>
			</Table>
			<br />
			<div className='App'>
				<table className='table table-bordered'>
					<thead>
						<tr>
							<th>Nombre Corto</th>
							<th>Nombre Largo</th>
						</tr>
					</thead>
					<tbody>
						{companies.map((elemento) => (
							<tr key={elemento.id}>
								<td>{elemento.shortname}</td>
								<td>{elemento.name}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</Page>
	)
}

export default GroupRegisteredCompanies
