import Split from 'react-split-grid'

import styles from './Test.module.scss'
import { useEffect } from 'react'
import { useProposal } from '../context/providers/ProposalContext'

const Test = () => {
	const { proposal, getProposal, isLoading } = useProposal()

	useEffect(() => {
		getProposal(1)
		console.log(proposal)
	}, [])

	if (isLoading && !proposal) {
		return null
	}

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
export default Test
