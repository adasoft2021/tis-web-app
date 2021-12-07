import React from 'react'
import Page from '../Page'
import { SpaceAnswerProvider } from '../../context/providers/SpaceAnswerContext'
import ComponentsGroup from './components/ComponentsGroup'

export default function GroupInformationReport() {
	return (
		<Page>
			<a href='/reports'>
				<img src='/flechaAtras.png' width='26' />
			</a>
			<h3 className='p-3' style={{ fontWeight: '700' }}>
				Reportes de Información de las GE del semestre actual
			</h3>
			<SpaceAnswerProvider>
				<ComponentsGroup />
			</SpaceAnswerProvider>
		</Page>
	)
}
