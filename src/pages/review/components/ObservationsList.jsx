import { Container, Spinner } from 'react-bootstrap'
import { useLocation } from 'wouter'
import { useObservationsList } from '../../../context/providers/ObservationContext'
import Observation from './Observation'

import styles from './ObservationsList.module.scss'

function getReviewId(url) {
	return url.split('/').at(-1)
}

export default function ObservationsList() {
	const [location] = useLocation()
	const { errorObservationList, isLoadingObservationsList, observations } =
		useObservationsList(getReviewId(location))

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
				{observations.map(({ id, title, description }) => (
					<Observation
						key={id}
						id={id}
						title={title}
						description={description}
					/>
				))}
				<Observation />
			</Container>
		</div>
	)
}
