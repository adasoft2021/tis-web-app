import ConversationForm from './ConversationForm'

export default function Conversation({ children, add = false }) {
	return (
		<div className='d-flex flex-column justify-content-between gap-3 h-100'>
			{children}
			<ConversationForm add={add} />
		</div>
	)
}
