import React from 'react'
import AccordionOne from '../../../components/tables/AccordionOne'
import TableOne from '../../../components/tables/tableOne'
import TableTwo from '../../../components/tables/tableTwo'
import { useActualCompanies } from '../../../context/providers/CompanyContext'

export default function ComponentsGroup() {
	const { companies } = useActualCompanies()

	return (
		<div>
			<TableOne companies={companies} />
			<TableTwo companies={companies} />
			<AccordionOne companies={companies} />
		</div>
	)
}
