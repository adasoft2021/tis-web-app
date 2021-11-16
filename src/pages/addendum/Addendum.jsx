import ObservationsListView from '../../components/ObservationsListView'
import Page from '../Page'

const Addendum = () => {
	const titulo = 'Adenda 04-2021'
	const nombreAsesor = 'Maria Leticia Coca Blanco'
	const fecha = '14/11/2021'
	const comentario =
		'TIS ha revisado la propuesta corregida que Evil Genius ha entregado y se ha evidenciado que no se han respondido a cabalidad las observaciones de la orden de cambio, por lo que en comun acuerdo se define la siguiente adenda a los puntos no respondidos a cabalidad de la orden de cambio:'
	return (
		<Page>
			<div className='d-flex align-items-center flex-column'>
				<h2> {titulo} </h2>

				<p> {nombreAsesor} </p>
				<p> {fecha} </p>
				<p> {comentario} </p>
				<ObservationsListView />
			</div>
		</Page>
	)
}

export default Addendum
