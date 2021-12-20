import { ReviewProvider } from '../../context/providers/ReviewContext'
// import styles from './BoardPresentationProposals.module.scss'
import Page from '../Page'

import BoardListReviewsGE from './BoardListReviewsGE'

const BoardPresentationProposals = () => {
	return (
		<>
			<Page>
				<h2>Presentacion de Propuestas TIS</h2>
				<ReviewProvider>
					<BoardListReviewsGE />
				</ReviewProvider>
			</Page>
		</>
	)
}

export default BoardPresentationProposals
