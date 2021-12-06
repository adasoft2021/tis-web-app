import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Page from '../Page'
import './GroupRegisteredCompanies.scss'
function GroupRegisteredCompanies() {
	const dataPaises = [
		{ id: 1, nombre: 'FilipinasSoft', nombreLargo: 'Filipinas Software' },
		{ id: 2, nombre: 'BrasilSoft', nombreLargo: 'Brasil Software' },
		{ id: 3, nombre: 'ColombiaSoft', nombreLargo: 'Colombia Software' },
		{ id: 4, nombre: 'NigeriaSoft', nombreLargo: 'Nigeria Software' },
		{ id: 5, nombre: 'ArgentinaSoft', nombreLargo: 'Argentina Software' },
		{ id: 6, nombre: 'IndonesiaSoft', nombreLargo: 'Indonesia Software' },
		{
			id: 7,
			nombre: 'ÁrabeUnidosSoft',
			nombreLargo: 'ÁrabeUnidos Software',
		},
		{ id: 8, nombre: 'MéxicoSoft', nombreLargo: 'México Software' },
		{ id: 9, nombre: 'SudáfricaSoft', nombreLargo: 'Sudáfrica Software' },
		{ id: 10, nombre: 'EgiptoSoft', nombreLargo: 'Egipto Software' },
	]

	const [data] = useState(dataPaises)

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
						<td>{data.length}</td>
					</tr>
				</tbody>
			</Table>
			<br />
			<div className='App'>
				<table className='table table-bordered'>
					<thead>
						<tr>
							<th>No.</th>
							<th>Nombre Corto</th>
							<th>Nombre Largo</th>
						</tr>
					</thead>
					<tbody>
						{data.map((elemento) => (
							<tr key={elemento.id}>
								<td>{elemento.id}</td>
								<td>{elemento.nombre}</td>
								<td>{elemento.nombreLargo}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</Page>
	)
}

export default GroupRegisteredCompanies
