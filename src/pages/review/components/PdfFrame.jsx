import { Container, Spinner } from 'react-bootstrap'
import { useProposal } from '../../../context/providers/ProposalContext'

import styles from './PdfFrame.module.scss'

export default function PdfFrame() {
	const { error, isLoading, proposal } = useProposal()

	if (isLoading || !proposal) {
		return (
			<Container
				className={`${styles.pdf} d-flex justify-content-center align-items-center`}
			>
				{error ? (
					<p className='text-center'>{error}</p>
				) : (
					<Spinner animation='border' role='status'>
						<span className='visually-hidden'>Loading...</span>
					</Spinner>
				)}
			</Container>
		)
	}

	return <iframe className={styles.pdf} src={proposal.fileUrl} />
}
