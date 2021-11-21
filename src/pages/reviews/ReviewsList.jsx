import { useEffect, useState } from 'react'
import { Button, Row } from 'react-bootstrap'
import { IoIosAdd } from 'react-icons/io'
import { Link } from 'wouter'
import { useReview } from '../../context/providers/ReviewContext'
import Page from '../Page'
import ReviewForm from './ReviewForm'

export const ReviewsList = () => {
	const [show, setShow] = useState(false)
	const { review, reviews, getAdviserReviews } = useReview()

	useEffect(() => {
		getAdviserReviews()
	}, [review])
	useEffect(() => {
		getAdviserReviews()
	}, [])
	return (
		<Page>
			<h2>Revisiones</h2>
			{reviews.map((review) => (
				<Row key={review.id}>
					<Link to={`/reviews/${review.id}`}>
						<h5 className='link-primary'> {review.title}</h5>
					</Link>
					<p>{review.createdAt.substring(0, 10)}</p>
				</Row>
			))}
			<center>
				<Button
					variant='info'
					className='rounded-circle'
					style={{ width: '56px', height: '56px' }}
					title='Crear nueva revisión'
					onClick={() => setShow(true)}
				>
					<IoIosAdd className='text-light' size={32} />
				</Button>
			</center>
			<ReviewForm show={show} onHide={() => setShow(false)} />
		</Page>
	)
}
