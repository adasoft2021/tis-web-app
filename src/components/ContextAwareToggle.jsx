import { useContext } from 'react'
import { useAccordionButton, AccordionContext } from 'react-bootstrap'
import styles from './ContextAwareToggle.module.scss'
export default function ContextAwareToggle({ children, eventKey, callback }) {
	const { activeEventKey } = useContext(AccordionContext)

	const decoratedOnClick = useAccordionButton(
		eventKey,
		() => callback && callback(eventKey)
	)

	const isCurrentEventKey = activeEventKey === eventKey

	return (
		<button
			className={`text-light  ${
				isCurrentEventKey ? styles.active : styles.more
			}`}
			type='button'
			onClick={decoratedOnClick}
		>
			{children}
		</button>
	)
}
