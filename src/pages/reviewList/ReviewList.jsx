import { Spinner } from 'react-bootstrap'
import DisplayLinkList from '../../components/DisplayLinkList'
import { useCompanyReviews } from '../../context/providers/ReviewContext'
import Page from '../Page'

const ReviewList = () => {
	const { isLoading, reviews } = useCompanyReviews()
	return (
		<Page>
			{isLoading ? (
				<div className='d-flex m-5 justify-content-center align-items-center'>
					<Spinner animation='border' />
				</div>
			) : (
				<DisplayLinkList
					title='Revisiones'
					description=''
					linkList={reviews}
					emptyMessage='Aún no hay revisiones'
				/>
			)}
		</Page>
	)
}

export default ReviewList
