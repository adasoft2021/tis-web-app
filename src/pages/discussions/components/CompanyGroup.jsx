import { React } from 'react'
import { Image, NavLink } from 'react-bootstrap'
import { BsCircleFill } from 'react-icons/bs'
import { useDiscussion } from '../../../context/providers/DiscussionContext'
import styles from './Discussion.module.scss'

export default function CompanyGroup({ company, onClickCompany }) {
	const { setCompanyId } = useDiscussion()
	return (
		<NavLink
			justify='flex-end'
			expand='lg'
			eventKey={company.id}
			className='p-3 ps-4 border-bottom border-light text-light'
			onClick={() => {
				onClickCompany()
				setCompanyId(company.id)
			}}
		>
			<Image src={company.src || '/logo.png'} roundedCircle width={25} />

			<span className={styles.name}>{company.name}</span>

			{company.messangerState ? (
				<div className={styles.icon}>
					<BsCircleFill size={13} />
				</div>
			) : null}
		</NavLink>
	)
}
