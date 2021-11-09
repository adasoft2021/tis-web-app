import React from 'react'
import CGregistrationForm from '../../components/CGregistrationForm'
import { ClassCodeProvider } from '../../context/providers/ClassCodeContext'
import { CompanyProvider } from '../../context/providers/CompanyContext'
import Page from '../Page'
export default function Register() {
	return (
		<Page>
			<ClassCodeProvider>
				<CompanyProvider>
					<CGregistrationForm />
				</CompanyProvider>
			</ClassCodeProvider>
		</Page>
	)
}
