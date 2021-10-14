import { Alert } from 'react-bootstrap'

import styles from './Toast.module.scss'

export default function Toast() {
	return (
		<Alert
			className={styles.toast}
			variant='danger'
			show={true}
			dismissible
		>
			<p>
				Change this and that and try again. Duis mollis, est non commodo
				luctus, nisi erat porttitor ligula, eget lacinia odio sem nec
				elit. Cras mattis consectetur purus sit amet fermentum.
			</p>
		</Alert>
	)
}
