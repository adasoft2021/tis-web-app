import { useEffect } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import { useObservation } from '../../../context/providers/ObservationContext'
import { useReview } from '../../../context/providers/ReviewContext'
import Observation from './Observation'

import styles from './ObservationsList.module.scss'

export default function ObservationsList({ fileId, fileName }) {
	const { review } = useReview()
	const {
		errorObservationList,
		isLoadingObservationsList,
		observations,
		getAllReviewObservations,
	} = useObservation()

	useEffect(() => {
		getAllReviewObservations({ reviewId: review.id })
	}, [])
	if (isLoadingObservationsList || errorObservationList) {
		return (
			<Container className='d-flex justify-content-center my-3'>
				{errorObservationList ? (
					<p className='text-center'>{errorObservationList}</p>
				) : (
					<Spinner animation='border' role='status'>
						<span className='visually-hidden'>Loading...</span>
					</Spinner>
				)}
			</Container>
		)
	}

	return (
		<div className={styles.list}>
			<Container className='my-3 d-flex flex-column gap-3'>
				{observations
					.filter(
						(observation) =>
							observation.fileName &&
							observation.fileName.localeCompare(fileName) === 0
					)
					.map(({ id, title, description }) => (
						<Observation
							key={id}
							id={id}
							title={title}
							description={description}
						/>
					))}
				<Observation fileId={fileId} />
			</Container>
		</div>
	)
}
