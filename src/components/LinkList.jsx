import { Link, useLocation } from 'wouter'

const LinkList = ({ list }) => {
	const [location] = useLocation()
	return (
		<>
			{list.map((item) => (
				<div className='d-flex' key={item.id}>
					<img className='me-2' src='/image/clickMouse.png' />
					<Link to={`${location}/${item.id}`}>
						<a>{item.title}</a>
					</Link>
				</div>
			))}
		</>
	)
}

export default LinkList
