import styles from './Grid.module.scss'
import ObservationsList from './ObservationsList'

import Split from 'react-split-grid'
import PdfFrame from './PdfFrame'

export default function Grid({ getGridProps, getGutterProps }) {
	return (
		<Split
			minSize={100}
			cursor='ew-resize'
			render={({ getGridProps, getGutterProps }) => (
				<div className={styles.grid} {...getGridProps()}>
					<PdfFrame />
					<div
						className={styles['vertical-gutter']}
						{...getGutterProps('column', 1)}
					/>
					<ObservationsList />
				</div>
			)}
		/>
	)
}
