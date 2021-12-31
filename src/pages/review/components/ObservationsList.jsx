import { Container, Spinner } from 'react-bootstrap'
import { useLocation } from 'wouter'
import { useObservationsList } from '../../../context/providers/ObservationContext'
import Observation from './Observation'

import styles from './ObservationsList.module.scss'

function getReviewId(url) {
	return url.split('/').at(-1)
}

export default function ObservationsList({ file }) {
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
			{file ? (
				<>
					<div className='p-3 sticky-top bg-secondary'>
						<span className='text-light'>{file.name}</span>
					</div>
					<Container className='my-3 d-flex flex-column gap-3'>
						{observations
							.filter(
								(observation) => observation.fileId === file.id
							)
							.sort((ob1, ob2) => ob1.id - ob2.id)
							.map(({ id, title, description }) => (
								<Observation
									key={id}
									id={id}
									title={title}
									description={description}
									reviewId={getReviewId(location)}
									fileId={file.id}
								/>
							))}
						<Observation
							reviewId={getReviewId(location)}
							fileId={file.id}
						/>
					</Container>
				</>
			) : (
				<div className='p-3'>
					<span>
						Seleccione un Archivo para visualizar sus observaciones
					</span>
				</div>
			)}
		</div>
	)
}
