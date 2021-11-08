import { Col, Container, Image, Nav, Navbar, Row } from 'react-bootstrap'
import { Link, useLocation } from 'wouter'
import RegisterButton from '../components/RegisterButton'
import { useUserCredentials } from '../context/providers/UserCredentialsContext'
import { userTypes } from '../context/reducers/userCredentialsReducer'

import styles from './Page.module.scss'

export default function Page({ children }) {
	const [location, setLocation] = useLocation()
	const { id, userType, userName } = useUserCredentials()
	const ShowUser = () => {
		if (id)
			switch (userType) {
				case userTypes.ADVISER:
					return (
						<div className='d-flex align-items-center justify-content-evenly p-2 border-bottom border-light'>
							<Image src='/logo.png' roundedCircle width={48} />
							<p className='m-0 text-light fw-bold'>
								Blanco Coca María Leticia
							</p>
						</div>
					)
				case userTypes.COMPANY:
					return (
						<div
							className='d-flex align-items-center justify-content-evenly p-2 border-bottom border-light'
							onClick={() => {
								setLocation('/additional-info')
							}}
						>
							<Image src='/logo.png' roundedCircle width={48} />
							<p className='m-0 text-light fw-bold'>{userName}</p>
						</div>
					)
			}
		return null
	}

	return (
		<>
			<Navbar bg='dark' variant='dark' expand='lg'>
				<Container>
					<Link to='/'>
						<Navbar.Brand>
							<img
								alt=''
								src='/logo.png'
								width='32'
								height='32'
								className='d-inline-block align-top'
							/>
							TIS
						</Navbar.Brand>
					</Link>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ms-auto'>
							<RegisterButton />
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<Row className={styles.page}>
				<Col sm={2} className='bg-secondary p-0'>
					<ShowUser />
					<Nav
						defaultActiveKey={location}
						variant='pills'
						className='flex-column'
					>
						<Link to='/announcements'>
							<Nav.Link
								eventKey='/announcements'
								className='p-3 ps-4 border-bottom border-light text-light'
							>
								Convocatorias
							</Nav.Link>
						</Link>
						{userType ? (
							<div>
								<Link to='/specification_sheets'>
									<Nav.Link
										eventKey='/specification_sheets'
										className='p-3 ps-4 border-bottom border-light text-light'
									>
										Pliego de especificaciones
									</Nav.Link>
								</Link>
								<Link to='/projects'>
									<Nav.Link
										eventKey='/projects'
										className='p-3 ps-4 border-bottom border-light text-light'
									>
										Proyectos TIS
									</Nav.Link>
								</Link>
							</div>
						) : null}
						<Link to='/companies'>
							<Nav.Link
								eventKey='/companies'
								className='p-3 ps-4 border-bottom border-light text-light'
							>
								Lista de GE
							</Nav.Link>
						</Link>
					</Nav>
				</Col>
				<Col sm={10} className={styles.content}>
					{children}
				</Col>
			</Row>
		</>
	)
}
