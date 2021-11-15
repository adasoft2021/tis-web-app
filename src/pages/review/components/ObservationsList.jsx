import { Container, Spinner } from 'react-bootstrap'
import { useObservationsList } from '../../../context/providers/ObservationContext'
import Observation from './Observation'

import styles from './ObservationsList.module.scss'

export default function ObservationsList() {
	const { errorObservationList, isLoadingObservationsList, observations } =
		useObservationsList(1)

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
