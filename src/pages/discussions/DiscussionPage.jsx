import Conversation from '../../components/Conversation'
import Page from '../Page'
import DiscussionsList from './components/DiscussionsList'

export default function DiscussionPage() {
	return (
		<Page>
			<Conversation add>
				<DiscussionsList />
			</Conversation>
		</Page>
	)
}
