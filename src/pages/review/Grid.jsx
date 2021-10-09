import styles from './Grid.module.scss'
import ObservationsList from './ObservationsList'

export default function Grid({ getGridProps, getGutterProps }) {
	return (
		<div className={styles.grid} {...getGridProps()}>
			<iframe className={styles.pdf} src='/files/ADASOFTParteA.pdf' />
			<div
				className={styles['vertical-gutter']}
				{...getGutterProps('column', 1)}
			/>
			<ObservationsList />
		</div>
	)
}
