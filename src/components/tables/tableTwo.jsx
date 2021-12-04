import React from 'react'
import { Col, Row } from 'react-bootstrap'
import DataTable from 'react-data-table-component'

const table1 = [
	{ id: 1, nombre: 'Ada Soft', correo: 'adasoftsrl.@gmail.com' },
	{ id: 2, nombre: 'Add Soft', correo: 'add.soft@gmail.com' },
	{ id: 3, nombre: 'Jadesoft', correo: 'jadesoft@gmail.com' },
]
const columnas = [
	{
		name: 'Nombre',
		selector: 'nombre',
		sortable: true,
	},
	{
		name: 'Correo eléctronico',
		selector: 'correo',
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
export default function tableTwo() {
	return (
		<Row>
			<h4 style={{ color: '#07BCFF', fontWeight: '700' }}>
				Correos electrónicos de las GE
			</h4>
			<Col>
				<DataTable
					columns={columnas}
					data={table1}
					customStyles={customStyles}
					pointerOnHover
					highlightOnHover
				/>
			</Col>
			<Col></Col>
		</Row>
	)
}
