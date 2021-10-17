import { Container } from 'react-bootstrap'
import PublicationList from './PublicationList'

export default function PublicationView({
	title,
	message,
	buttonMessage,
	publicationType,
}) {
	return (
		<Container>
			<h2>{title}</h2>
			<PublicationList
				buttonMessage={buttonMessage}
				message={message}
				publicationType={publicationType}
			/>
		</Container>
	)
}
