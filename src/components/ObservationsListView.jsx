import styles from './ObservationsListView.module.scss'

const ObservationsListView = ({ observations }) => {
	return (
		<>
			<h4>Observaciones</h4>
			<ol className={styles.lista}>
				{observations.map((item) => (
					<li key={item.id}>{item.description}</li>
				))}
			</ol>
		</>
	)
}

export default ObservationsListView
