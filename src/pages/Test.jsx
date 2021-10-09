import Split from 'react-split-grid'

import styles from './Test.module.scss'

export default function Test() {
	return (
		<Split
			minSize={100}
			cursor='col-resize'
			render={({ getGridProps, getGutterProps }) => (
				<div className={styles.grid} {...getGridProps()}>
					<embed
						src='/files/ADASOFTParteA.pdf'
						type='application/pdf'
						width='100%'
						style={{ height: '100vh' }}
					/>
					<div>Mundo</div>
					<div
						className={styles['vertical-gutter']}
						{...getGutterProps('column', 1)}
					/>
				</div>
			)}
		/>
	)
}
