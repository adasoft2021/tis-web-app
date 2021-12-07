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
		name: 'Correo eléctronico',
		selector: 'email',
		sortable: true,
		style: { color: '#07BCFF', textDecoration: 'underline' },
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
export default function tableTwo({ companies }) {
	return (
		<Row>
			<h4 style={{ color: '#07BCFF', fontWeight: '700' }}>
				Correos electrónicos de las GE
			</h4>
			<Col>
				<DataTable
					columns={columnas}
					data={companies}
					customStyles={customStyles}
					pointerOnHover
					highlightOnHover
				/>
			</Col>
			<Col></Col>
		</Row>
	)
}
