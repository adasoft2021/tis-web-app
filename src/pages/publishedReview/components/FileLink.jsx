import { Link } from 'wouter'

export default function FileLink({ name, url }) {
	return (
		<div className='d-flex'>
			<img src='/flecha.png' alt='Icono de flecha' />
			<Link href={url} target='_blank'>
				{name}
			</Link>
		</div>
	)
}
