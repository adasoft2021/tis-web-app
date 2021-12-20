import { ReviewProvider } from '../../context/providers/ReviewContext'
import Page from '../Page'
import PublishedReview from './components/PublishedReview'

export default function PublishedReviewPage(props) {
	return (
		<Page>
			<ReviewProvider>
				<PublishedReview {...props} />
			</ReviewProvider>
		</Page>
	)
}
