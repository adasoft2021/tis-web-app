import { ReviewProvider } from '../../context/providers/ReviewContext'
import { useUserCredentials } from '../../context/providers/UserCredentialsContext'
import { userTypes } from '../../context/reducers/userCredentialsReducer'
// import styles from './BoardPresentationProposals.module.scss'
import Page from '../Page'

import BoardListReviewsGE from './BoardListReviewsGE'
import ReviewList from '../reviewList/ReviewList'
import { Container } from 'react-bootstrap'

const BoardPresentationProposals = () => {
	const { userType } = useUserCredentials()
	if (userType === userTypes.COMPANY)
		return (
			<ReviewProvider>
				<ReviewList />
			</ReviewProvider>
		)
	return (
		<>
			<Page>
				<Container className='my-3'>
					<h2>Presentacion de Propuestas TIS</h2>
					<ReviewProvider>
						<BoardListReviewsGE />
					</ReviewProvider>
				</Container>
			</Page>
		</>
	)
}

export default BoardPresentationProposals
