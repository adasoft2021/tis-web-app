import NoteTable from '../../components/NoteTable'
import ObservationsListView from '../../components/ObservationsListView'
import Page from '../Page'

const ReviewCompany = ({ review }) => {
	const showDate = (date) => {
		const dateR = new Date(date)

		return dateR.toDateString()
	}
	return (
		<Page>
			<div className='d-flex align-items-center flex-column'>
				<h2> {review.title} </h2>
				<p> {review.adviserName} </p>
				<p> {showDate(review.createdAt)} </p>

				{review.qualifications.length > 0 && (
					<NoteTable qualifications={review.qualifications} />
				)}

				{review.observations.length > 0 && (
					<ObservationsListView observations={review.observations} />
				)}

				<p> {review.comment} </p>
			</div>
		</Page>
	)
}

export default ReviewCompany
