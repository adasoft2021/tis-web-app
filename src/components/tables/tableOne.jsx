import React from 'react'
import { Col, Row } from 'react-bootstrap'
import DataTable from 'react-data-table-component'

const columnas = [
	{
		name: 'Nombre',
		selector: 'name',
		sortable: true,
	},
	{
		name: 'N° Socios',
		selector: 'partnersCount',
		sortable: true,
	},
]

const customStyles = {
	rows: {
		style: {
			minHeight: '35px',
		},
	},
	headCells: {
		style: {
			paddingLeft: '8px',
			paddingRight: '8px',
			fontSize: '15px',
			fontWeight: '700',
		},
	},
	cells: {
		style: {
			paddingLeft: '8px',
			paddingRight: '8px',
		},
	},
}
export default function tableOne({ companies }) {
	return (
		<Row>
			<h4 style={{ color: '#07BCFF', fontWeight: '700' }}>
				Cantidad de socios por GE
			</h4>
			<Col>
				<DataTable
					columns={columnas}
					data={companies.map(({ id, name, partners }) => ({
						id,
						name,
						partnersCount: partners.length,
					}))}
					customStyles={customStyles}
					pointerOnHover
					highlightOnHover
				/>
			</Col>
			<Col></Col>
		</Row>
	)
}
