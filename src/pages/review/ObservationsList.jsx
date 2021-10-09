import { Container } from 'react-bootstrap'
import Observation from './Observation'

import styles from './ObservationsList.module.scss'

export default function ObservationsList() {
	return (
		<div className={styles.list}>
			<Container className='my-3'>
				<Observation />
			</Container>
		</div>
	)
}
