import React from 'react'
import AccordionOne from '../../components/tables/AccordionOne'
import TableOne from '../../components/tables/tableOne'
import TableTwo from '../../components/tables/tableTwo'
import Page from '../Page'

export default function GroupInformationReport() {
	return (
		<Page>
			<a title='Los Tejos' href='/reports'>
				<img src='/flechaAtras.png' width='26' />
			</a>
			<h3 className='p-3' style={{ fontWeight: '700' }}>
				Reportes de Información de las GE del semestre actual
			</h3>
			<TableOne></TableOne>
			<TableTwo></TableTwo>
			<AccordionOne></AccordionOne>
		</Page>
	)
}
