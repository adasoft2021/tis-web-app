import { Link } from 'wouter'

export default function FileLink({ name, url }) {
	return (
		<div className='d-flex align-items-center gap-2'>
			<img src='/flecha.png' alt='Icono de flecha' width={26} />
			<Link href={url} target='_blank'>
				{name}
			</Link>
		</div>
	)
}
