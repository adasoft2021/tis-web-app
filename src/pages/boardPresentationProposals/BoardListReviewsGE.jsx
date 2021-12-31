import { Spinner } from 'react-bootstrap'
import AccordionItem from '../../components/AccordionItem'
import { useInformationStatusReview } from '../../context/providers/ReviewContext'
import { MdIndeterminateCheckBox, MdCheckBox } from 'react-icons/md'
import { Link } from 'wouter'

const className = {
	'Sin Revisar': 'btn-secondary',
	Revisada: 'btn-warning',
	Calificada: 'btn-info',
}

function getClassNameState(state) {
	return className[state] || 'btn-success'
}
function Boton({ status, published, id }) {
	return (
		<Link
			to={
				published === false
					? `/reviews/${id}`
					: `/reviews/${id}/published`
			}
			className={`btn ${getClassNameState(
				status
			)} d-flex align-items-center gap-2`}
		>
			{published ? <MdCheckBox /> : <MdIndeterminateCheckBox />}

			{`${published ? 'Emitido: ' : ''} ${status}`}
		</Link>
	)
}

function Header({ companyName, listReviews }) {
	return (
		<div className='d-flex justify-content-between align-items-center'>
			<span>{companyName}</span>
			<div className='d-flex justify-content-center gap-2'>
				{listReviews.map((review) => (
					<Boton
						status={review.status}
						published={review.published}
						id={review.id}
						key={review.id}
					/>
				))}
			</div>
		</div>
	)
}

const BoardListReviewsGE = () => {
	const { reviews, isLoading } = useInformationStatusReview()
	return (
		<>
			{isLoading ? (
				<div className='d-flex m-5 justify-content-center align-items-center'>
					<Spinner animation='border' />
				</div>
			) : (
				<>
					{reviews.length !== 0 ? (
						reviews
							.filter((answer) => answer.length > 0)
							.map((answer, index) => (
								<AccordionItem
									header={
										<Header
											companyName={answer[0].companyName}
											listReviews={answer}
										/>
									}
									key={index}
									body={''}
								/>
							))
					) : (
						<h4>Aún no hay propuestas de alguna GE</h4>
					)}
				</>
			)}
		</>
	)
}

export default BoardListReviewsGE
