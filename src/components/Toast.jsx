import { Alert } from 'react-bootstrap'
import { useToast } from '../context/providers/ToastContext'

import styles from './Toast.module.scss'

export default function Toast() {
	const { closeToast, color, message, show } = useToast()

	return (
		<Alert
			className={styles.toast}
			variant={color}
			show={show}
			onClose={closeToast}
			dismissible
		>
			<p>{message}</p>
		</Alert>
	)
}
