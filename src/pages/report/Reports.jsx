import React from 'react'
import AccordionOne from '../../components/tables/AccordionOne'
import TableOne from '../../components/tables/tableOne'
import TableTwo from '../../components/tables/tableTwo'
import Page from '../Page'

export default function Reports() {
	return (
		<Page>
			<h3 style={{ fontWeight: '700' }}>
				Reportes de Información de las GE del semestre actual
			</h3>
			<TableOne></TableOne>
			<TableTwo></TableTwo>
			<AccordionOne></AccordionOne>
		</Page>
	)
}
