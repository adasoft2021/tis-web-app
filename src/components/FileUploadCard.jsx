import { Card } from 'react-bootstrap'
import styles from './FileUploadCard.module.scss'

const FileUploadCard = ({ pathImg, cardTitle, url, target = '_self' }) => {
	return (
		<>
			<Card className={styles.card}>
				<a target={target} href={url}>
					<Card.Img variant='top' src={pathImg} />
					<Card.Body className={styles.body}>
						<Card.Title className={styles.cardTitle}>
							{cardTitle}
						</Card.Title>
					</Card.Body>
				</a>
			</Card>
		</>
	)
}

export default FileUploadCard
