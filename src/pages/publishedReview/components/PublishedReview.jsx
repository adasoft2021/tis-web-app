import { Col, Container, Row, Spinner } from 'react-bootstrap'
import { useReviewById } from '../../../context/providers/ReviewContext'
import FileLink from './FileLink'

export default function PublishedReview({ params: { reviewId } }) {
	const { isLoading, review } = useReviewById(reviewId)
	if (isLoading) {
		return (
			<div className='d-flex m-5 justify-content-center align-items-center'>
				<Spinner animation='border' />
			</div>
		)
	}
	return (
		<Container>
			<p className='h2 text-center'>{review.status}</p>
			<Row>
				<Col sm={6}>
					<p className='h3'>{review.companyName}</p>
					<div className='d-flex flex-column gap-3'>
						{review.spaceAnswers.map(({ files }) => {
							return files.map(({ name, url }) => (
								<FileLink key={name} name={name} url={url} />
							))
						})}
					</div>
				</Col>
				<Col sm={6}>
					<p className='h3'>Emitido</p>
					<FileLink name={`Documento ${review.status}`} url='' />
				</Col>
			</Row>
		</Container>
	)
}
