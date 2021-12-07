import React from 'react'
import Page from '../Page'
import ComponentsGroup from './components/ComponentsGroup'
import { CompanyProvider } from '../../context/providers/CompanyContext'

export default function GroupInformationReport() {
	return (
		<Page>
			<a href='/reports'>
				<img src='/flechaAtras.png' width='26' />
			</a>
			<h3 className='p-3' style={{ fontWeight: '700' }}>
				Reportes de Información de las GE del semestre actual
			</h3>
			<CompanyProvider>
				<ComponentsGroup />
			</CompanyProvider>
		</Page>
	)
}
