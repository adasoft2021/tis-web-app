import React from 'react'
import { Col, Row } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import Page from '../../pages/Page'
import { useListProposals } from '../../context/providers/ProposalContext'

const columnas = [
	{
		name: 'GE',
		selector: 'companyName',
		sortable: true,
	},
	{
		name: 'Titulo del Espacio',
		selector: 'title',
		sortable: true,
	},
	{
		name: 'Fecha de entrega',
		selector: 'createAt',
		sortable: true,
	},
	{
		name: 'Fecha de limite',
		selector: 'limitDate',
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
	const { proposals } = useListProposals()
	return (
		<Page>
			<a href='/companyGroupResponses'>
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
						data={proposals}
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
