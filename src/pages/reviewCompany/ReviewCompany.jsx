import { Spinner } from 'react-bootstrap'
import NoteTable from '../../components/NoteTable'
import ObservationsListView from '../../components/ObservationsListView'
import { useCompanyReviewById } from '../../context/providers/ReviewContext'
import Page from '../Page'
import { useState, useEffect } from 'react'

const showDate = (date) => {
	const dateR = new Date(date)

	return dateR.toDateString()
}

const ReviewCompany = ({ reviewId }) => {
	const { isLoading, review: reviewDTO } = useCompanyReviewById({ reviewId })
	const [review, setReview] = useState(null)
	useEffect(() => {
		if (!isLoading && reviewDTO)
			setReview({ ...reviewDTO, title: reviewDTO.status.substring(3) })
	}, [reviewDTO])
	return (
		<Page>
			{isLoading ? (
				<div className='d-flex m-5 justify-content-center align-items-center'>
					<Spinner animation='border' />
				</div>
			) : review ? (
				<div className='d-flex align-items-center flex-column'>
					<h2> {review.title} </h2>
					<p> {review.adviserName} </p>
					<p> {showDate(review.createdAt)} </p>

					{review.qualifications.length > 0 && (
						<NoteTable qualifications={review.qualifications} />
					)}

					{review.observations.length > 0 && (
						<ObservationsListView
							observations={review.observations}
						/>
					)}

					<p> {review.comment} </p>
				</div>
			) : (
				<p>No existe la revision</p>
			)}
		</Page>
	)
}

export default ReviewCompany
