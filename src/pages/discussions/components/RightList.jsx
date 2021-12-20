import React from 'react'
import { Col, Row, Nav } from 'react-bootstrap'
import CompanyGroup from './CompanyGroup'
import styles from './Discussion.module.scss'
import { useActualCompanies } from '../../../context/providers/CompanyContext'

export default function RightList({ onClickCompany }) {
	const { companies } = useActualCompanies()
	/* const companies = [
		{ id: 1, src: '/logo.png', name: 'AdaSoftware', messangerState: true },
		{
			id: 2,
			src: '/logo.png',
			name: 'Acme Company',
			messangerState: false,
		},
		{ id: 3, src: '/logo.png', name: 'AdaSoftware', messangerState: true },
		{
			id: 4,
			src: '/logo.png',
			name: 'Acme Company',
			messangerState: false,
		},
		{ id: 5, src: '/logo.png', name: 'AdaSoftware', messangerState: true },
		{ id: 6, src: '/logo.png', name: 'Acme Company', messangerState: true },
		{ id: 7, src: '/logo.png', name: 'AdaSoftware', messangerState: true },
		{
			id: 8,
			src: '/logo.png',
			name: 'Acme Company',
			messangerState: false,
		},
		{ id: 9, src: '/logo.png', name: 'AdaSoftware', messangerState: true },
		{
			id: 10,
			src: '/logo.png',
			name: 'Acme Company',
			messangerState: false,
		},
	] */

	return (
		<div>
			<Row className={styles.page}>
				<Col sm={12} className='bg-dark p-0'>
					<Nav
						variant='dark'
						className='flex-column'
						defaultActiveKey=''
					>
						<div>
							<Nav.Link
								eventKey=''
								className='p-3 ps-4 border-bottom border-light text-light'
							>
								<h4>Grupo Empresas</h4>
							</Nav.Link>
							{companies.map((company) => (
								<CompanyGroup
									className={styles.page}
									key={company.id}
									company={company}
									onClickCompany={onClickCompany}
								></CompanyGroup>
							))}
						</div>
					</Nav>
				</Col>
			</Row>
		</div>
	)
}
