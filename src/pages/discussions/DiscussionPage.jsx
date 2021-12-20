import Page2 from './Page2'
import { CompanyProvider } from '../../context/providers/CompanyContext'
import { DiscussionProvider } from '../../context/providers/DiscussionContext'
import Page from '../Page'
import DiscussionsList from './components/DiscussionsList'
import Conversation from '../../components/Conversation'
import { useUserCredentials } from '../../context/providers/UserCredentialsContext'
import { userTypes } from '../../context/reducers/userCredentialsReducer'

export default function DiscussionPage() {
	const { userType } = useUserCredentials()
	return (
		<>
			<CompanyProvider>
				<DiscussionProvider>
					{userType === userTypes.ADVISER ? (
						<Page2 />
					) : (
						<Page>
							<Conversation add>
								<DiscussionsList></DiscussionsList>
							</Conversation>
						</Page>
					)}
				</DiscussionProvider>
			</CompanyProvider>
		</>
	)
}
