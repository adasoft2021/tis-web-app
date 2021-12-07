import React from 'react'
import { Col, Row } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import Page from '../../pages/Page'

const table1 = [
	{ id: 1, name: 'Ada Soft', signed: 'Firmado' },
	{ id: 2, name: 'Add Soft', signed: 'Sin Firmar' },
	{ id: 3, name: 'Jadesoft', signed: 'Firmado' },
]
const columnas = [
	{
		name: 'GE',
		selector: 'name',
		sortable: true,
	},
	{
		name: 'Firmada',
		selector: 'signed',
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
export default function TableSignedCompanyGroup() {
	return (
		<Page>
			<a title='Los Tejos' href='/companyGroupResponses'>
				<img src='/flechaAtras.png' width='26' />
			</a>

			<Row>
				<h4
					className='p-3'
					style={{ color: '#07BCFF', fontWeight: '700' }}
				>
					N° de las GE que han firmado contrato y N° faltan firmar
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
		</Page>
	)
}
