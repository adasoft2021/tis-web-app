import { Spinner } from 'react-bootstrap'
import { useSpaceInformation } from '../context/providers/SpaceContext'
import styles from './SpaceInformation.module.scss'

const showDate = (date) => {
	const dateR = new Date(date)

	return dateR.toDateString()
}
const SpaceInformation = ({ spaceId }) => {
	const { isLoading, spaceDTO } = useSpaceInformation({ spaceId })
	if (isLoading) {
		return (
			<div className='d-flex m-5 justify-content-center align-items-center'>
				<Spinner animation='border' />
			</div>
		)
	}
	if (!spaceDTO) {
		return <p>No existe el espacio</p>
	}
	return (
		<>
			<h2> {spaceDTO.title} </h2>
			<p>
				<b> Fecha limite: </b>
				<i className={styles.endDate}>{showDate(spaceDTO.limitDate)}</i>
			</p>
			<p> {spaceDTO.description}</p>
		</>
	)
}

export default SpaceInformation
