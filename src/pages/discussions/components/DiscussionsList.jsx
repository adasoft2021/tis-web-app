import CardDiscussion from './CardDiscussion'

const discussions = [
	{
		id: 1,
		title: 'Dudas sobre el espacio de seguimiento - Sprint 6',
		createdAt: '2021-12-09T22:47:33.461Z',
		createdById: 2,
	},
	{
		id: 2,
		title: 'Decadencia del equipo',
		createdAt: '2021-12-03T22:47:33.461Z',
		createdById: 1,
	},
	{
		id: 3,
		title: 'Dudas sobre el espacio de seguimiento - Sprint 5',
		createdAt: '2021-11-22T22:47:33.461Z',
		createdById: 2,
	},
	{
		id: 4,
		title: 'Dudas sobre el espacio de seguimiento - Sprint 1',
		createdAt: '2021-08-10T22:47:33.461Z',
		createdById: 2,
	},
]

export default function DiscussionsList() {
	return (
		<div className='container'>
			<p className='h3 mb-4'>Temas de Discusión</p>
			<div className='d-flex flex-column gap-3'>
				{discussions.map(({ createdAt, createdById, id, title }) => (
					<CardDiscussion
						key={id}
						createdAt={createdAt}
						createdById={createdById}
						id={id}
						title={title}
					/>
				))}
			</div>
		</div>
	)
}
