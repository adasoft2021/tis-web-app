import { React } from 'react'
import { Image, NavLink } from 'react-bootstrap'
import styles from './Discussion.module.scss'

export default function CompanyGroup({ company }) {
	return (
		<NavLink
			justify='flex-end'
			expand='lg'
			eventKey='/announcements'
			className='p-3 ps-4 border-bottom border-light text-light'
		>
			<Image src={company.src} roundedCircle width={25} />

			<span className={styles.name}>{company.name}</span>

			{company.messangerState ? (
				<Image
					src='/greenPoint.png'
					roundedCircle
					width={20}
					className={styles.icon}
				/>
			) : null}
		</NavLink>
	)
}
