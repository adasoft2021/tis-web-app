import CGregistrationForm from '../../components/CGregistrationForm'
import Page from '../Page'
import {
	CompanyProvider,
	useGetCompany,
} from '../../context/providers/CompanyContext'
import { ClassCodeProvider } from '../../context/providers/ClassCodeContext'

const AdditionalForm = () => {
	const { company } = useGetCompany()
	return <CGregistrationForm company={company} />
}

export default function AdditionalGE() {
	return (
		<Page>
			<ClassCodeProvider>
				<CompanyProvider>
					<AdditionalForm />
				</CompanyProvider>
			</ClassCodeProvider>
		</Page>
	)
}
