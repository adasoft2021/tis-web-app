import { Accordion, Container, Spinner } from 'react-bootstrap'
import { useReview } from '../../../context/providers/ReviewContext'

import styles from './PdfFrame.module.scss'

export default function PdfFrame({ setFile }) {
	const { error, isLoading, review } = useReview()

	if (isLoading || !review) {
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

	function getSpaceTitle(spaceId) {
		const space = review.spaces.filter((space) => space.id === spaceId)
		return space[0].title
	}

	return (
		<div>
			<Accordion defaultActiveKey='0' flush>
				{review.spaceAnswers
					.sort((s1, s2) => s1.id - s2.id)
					.map((spaceAnswer, index) => (
						<Accordion.Item key={spaceAnswer.id} eventKey={index}>
							<Accordion.Header>
								<p>
									{'Respuesta al espacio: ' +
										getSpaceTitle(spaceAnswer.spaceId)}
								</p>
							</Accordion.Header>
							<Accordion.Body>
								<Accordion
									defaultActiveKey='0'
									className='h-100'
								>
									{spaceAnswer.files
										.sort((f1, f2) => f1.id - f2.id)
										.map((file, findex) => (
											<Accordion.Item
												key={file.id}
												eventKey={findex}
												onClick={() =>
													setFile({
														id: file.id,
														name: file.name,
													})
												}
											>
												<Accordion.Header>
													<p>{file.name}</p>
												</Accordion.Header>
												<Accordion.Body>
													<iframe
														className={styles.pdf}
														src={file.url}
													/>
												</Accordion.Body>
											</Accordion.Item>
										))}
								</Accordion>
							</Accordion.Body>
						</Accordion.Item>
					))}
			</Accordion>
		</div>
	)
}
