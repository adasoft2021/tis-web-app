import { ReviewProvider } from '../../context/providers/ReviewContext'
import Page from '../Page'
import PublishedReview from './components/PublishedReview'

export default function PublishedReviewPage() {
	return (
		<Page>
			<ReviewProvider>
				<PublishedReview />
			</ReviewProvider>
		</Page>
	)
}
