import React from 'react'
import { Col, Row } from 'react-bootstrap'
import DataTable from 'react-data-table-component'

const table1 = [
	{ id: 1, nombre: 'Ada Soft', cantidadS: 5 },
	{ id: 2, nombre: 'Jadesoft', cantidadS: 4 },
]
const columnas = [
	{
		name: 'Nombre',
		selector: 'nombre',
		sortable: true,
	},
	{
		name: 'N° Socios',
		selector: 'cantidadS',
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
export default function tableOne() {
	return (
		<Row>
			<h4 style={{ color: '#07BCFF', fontWeight: '700' }}>
				Cantidad de socios por GE
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
