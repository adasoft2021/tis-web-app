import { Link } from 'wouter'

export default function FileLink({ name, url, blank = false }) {
	return (
		<div className='d-flex align-items-center gap-2'>
			<img src='/flecha.png' alt='Icono de flecha' width={26} />
			{blank ? (
				<a target='_blank' href={url}>
					{name}
				</a>
			) : (
				<Link to={url}>{name}</Link>
			)}
		</div>
	)
}
