import { Container, Spinner } from 'react-bootstrap'
import DisplayLinkList from '../../components/DisplayLinkList'
import { useCompanyReviews } from '../../context/providers/ReviewContext'
import Page from '../Page'

const ReviewList = () => {
	const { isLoading, reviews } = useCompanyReviews()
	return (
		<Page>
			<Container className='my-3'>
				{isLoading ? (
					<div className='d-flex m-5 justify-content-center align-items-center'>
						<Spinner animation='border' />
					</div>
				) : (
					<DisplayLinkList
						title='Revisiones'
						description=''
						linkList={reviews.map((review) => {
							return {
								...review,
								title: review.status.substring(3),
							}
						})}
						emptyMessage='Aún no hay revisiones'
					/>
				)}
			</Container>
		</Page>
	)
}

export default ReviewList
