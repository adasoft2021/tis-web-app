import { Accordion, Container, Spinner } from 'react-bootstrap'
import { useReview } from '../../../context/providers/ReviewContext'

import styles from './PdfFrame.module.scss'
import gridStyles from './Grid.module.scss'
import ObservationsList from './ObservationsList'
import Split from 'react-split-grid'

const FileObservation = ({ file, ...props }) => (
	<Split
		minSize={100}
		cursor='ew-resize'
		render={(props) => (
			<div className={gridStyles.grid} {...props.getGridProps()}>
				<iframe className={styles.pdf} src={file.url} />
				<div
					className={gridStyles['vertical-gutter']}
					{...props.getGutterProps('column', 1)}
				/>
				<ObservationsList fileId={file.id} fileName={file.name} />
			</div>
		)}
	/>
)

export default function PdfFrame({ ...props }) {
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
				{review.spaceAnswers.map((spaceAnswer, index) => (
					<Accordion.Item key={spaceAnswer.id} eventKey={index}>
						<Accordion.Header>
							<p>
								{'Respuesta al espacio: ' +
									getSpaceTitle(spaceAnswer.spaceId)}
							</p>
						</Accordion.Header>
						<Accordion.Body>
							<Accordion defaultActiveKey='0'>
								{spaceAnswer.files.map((file, findex) => (
									<Accordion.Item
										key={file.id}
										eventKey={findex}
									>
										<Accordion.Header>
											<p>{file.name}</p>
										</Accordion.Header>
										<Accordion.Body>
											<FileObservation
												file={file}
												{...props}
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
