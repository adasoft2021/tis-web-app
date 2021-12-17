import { Spinner } from 'react-bootstrap'
import AccordionItem from '../../components/AccordionItem'
import { useInformationStatusReview } from '../../context/providers/ReviewContext'
import { MdIndeterminateCheckBox, MdCheckBox } from 'react-icons/md'
import { Link } from 'wouter'

const className = {
	UNREVIEWED: 'btn-secondary',
	REVIEWED: 'btn-warning',
	QUALIFIED: 'btn-info',
}

const translate = {
	UNREVIEWED: 'No revisado',
	REVIEWED: 'Revisado',
	QUALIFIED: 'Calificado',
	CHANGE_ORDER: 'Orden de cambio',
	PROPOSAL_ACCEPTANCE: 'Notificacion de conformidad',
	ADDENDUM: 'Adenda',
}

function getClassNameState(state) {
	return className[state] || 'btn-success'
}
function Boton({ status, published, id }) {
	return (
		<Link
			to={`/reviews/${id}`}
			className={`btn ${getClassNameState(
				status
			)} d-flex align-items-center gap-2`}
		>
			{published ? <MdCheckBox /> : <MdIndeterminateCheckBox />}

			{`${published ? 'Emitido: ' : ''} ${translate[status]}`}
		</Link>
	)
}

function Header({ companyName, listReviews }) {
	console.log({ listReviews })
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
	const { isLoading } = useInformationStatusReview()
	const reviews = [
		[
			{
				id: 1,
				status: 'UNREVIEWED',
				companyName: 'NOMBRE G.E. 1',
				published: false,
			},
		],
		[
			{
				id: 2,
				status: 'REVIEWED',
				companyName: 'NOMBRE G.E. 2',
				published: false,
			},
		],
		[
			{
				id: 3,
				status: 'QUALIFIED',
				companyName: 'NOMBRE G.E. 3',
				published: false,
			},
		],
		[
			{
				id: 4,
				status: 'CHANGE_ORDER',
				companyName: 'NOMBRE G.E. 4',
				published: true,
			},
			{
				id: 5,
				status: 'UNREVIEWED',
				companyName: 'NOMBRE G.E. 4',
				published: false,
			},
		],
	]

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
