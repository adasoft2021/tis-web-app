import React from 'react'

import styles from './Discussion.module.scss'

export default function Comment({ comment, typeuser, primaryUser, date }) {
	return (
		<div>
			<div
				className={
					typeuser === 'ADVISER' && primaryUser === 'ADVISER'
						? styles.balloon1
						: typeuser === 'GE' && primaryUser === 'GE'
						? styles.balloon1
						: styles.balloon2
				}
			>
				<div className={styles.comment}>{comment}</div>
			</div>
			<div
				className={
					typeuser === 'ADVISER' && primaryUser === 'ADVISER'
						? styles.dateballoon1
						: typeuser === 'GE' && primaryUser === 'GE'
						? styles.dateballoon1
						: styles.dateballoon2
				}
			>
				{date}
			</div>
		</div>
	)
}
