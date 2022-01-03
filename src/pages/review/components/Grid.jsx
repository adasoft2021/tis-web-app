import styles from './Grid.module.scss'
import ObservationsList from './ObservationsList'
import Split from 'react-split-grid'
import PdfFrame from './PdfFrame'
import { useState } from 'react'

export default function Grid({ getGridProps, getGutterProps }) {
	const [file, setFile] = useState(null)
	return (
		<Split
			minSize={100}
			cursor='ew-resize'
			render={({ getGridProps, getGutterProps }) => (
				<div className={styles.grid} {...getGridProps()}>
					<PdfFrame setFile={setFile} />
					<div
						className={styles['vertical-gutter']}
						{...getGutterProps('column', 1)}
					/>
					<ObservationsList file={file} />
				</div>
			)}
		/>
	)
}
