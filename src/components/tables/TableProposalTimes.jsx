import React from 'react'
import { Col, Row } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import Page from '../../pages/Page'

const table1 = [
	{
		id: 1,
		name: 'Ada Soft',
		spaceTitle: 'Titulo1',
		deliveryDate: '4/12/2021',
		seadline: '6/12/2021',
		delay: 2,
	},
	{
		id: 2,
		name: 'Add Soft',
		spaceTitle: 'Titulo2',
		deliveryDate: '4/12/2021',
		seadline: '6/12/2021',
		delay: 5,
	},
	{
		id: 3,
		name: 'Jadesoft',
		spaceTitle: 'Titulo3',
		deliveryDate: '4/12/2021',
		seadline: '6/12/2021',
		delay: 4,
	},
]
const columnas = [
	{
		name: 'GE',
		selector: 'name',
		sortable: true,
	},
	{
		name: 'Titulo del Espacio',
		selector: 'spaceTitle',
		sortable: true,
	},
	{
		name: 'Fecha de entrega',
		selector: 'deliveryDate',
		sortable: true,
	},
	{
		name: 'Fecha de limite',
		selector: 'seadline',
		sortable: true,
	},
	{
		name: 'Retraso',
		selector: 'delay',
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
export default function TableProposalTimes() {
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
					Tiempos de presentacion de propuestas
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
