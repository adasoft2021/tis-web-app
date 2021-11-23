import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { IoIosAdd } from 'react-icons/io'
import DisplayLinkList from '../../components/DisplayLinkList'
import { useReview } from '../../context/providers/ReviewContext'
import Page from '../Page'
import ReviewForm from './ReviewForm'

export const ReviewsList = () => {
	const [show, setShow] = useState(false)
	const { review, reviews, getAdviserReviews } = useReview()

	useEffect(() => {
		getAdviserReviews()
	}, [review])
	useEffect(() => {
		getAdviserReviews()
	}, [])
	return (
		<Page>
			<DisplayLinkList
				title='Revisiones'
				description=''
				linkList={reviews}
				emptyMessage='Aún no hay revisiones'
			/>
			<center>
				<Button
					variant='info'
					className='rounded-circle'
					style={{ width: '56px', height: '56px' }}
					title='Crear nueva revisión'
					onClick={() => setShow(true)}
				>
					<IoIosAdd className='text-light' size={32} />
				</Button>
			</center>
			<ReviewForm show={show} onHide={() => setShow(false)} />
		</Page>
	)
}
