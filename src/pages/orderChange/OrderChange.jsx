import NoteTable from '../../components/NoteTable'
import ObservationsListView from '../../components/ObservationsListView'
import Page from '../Page'

const OrderChange = () => {
	const titulo = 'Orden de cambio'
	const nombreAsesor = 'Maria Leticia Coca Blanco'
	const fecha = '14/11/2021'
	const comentario =
		'Esta adenda de corrección debe ser entregada en el http://moodle3.umss.edu.bo/ antes de la firma del contrato. Paralelamente se solicita, llenar la planilla adjunta - RESUMENGRUPOEMPRESA; con la información resumen de su propuesta técnica. En este archivo debe registrar el día que su GE ha elegido para el seguimiento de su propuesta de desarrollo en el tiempo que dure el contrato con TIS. Asímismo, recordar que para el día de la firma del contrato se requiere la entrega de la planilla resumenrequerida.'
	return (
		<>
			<Page>
				<div className='d-flex align-items-center flex-column'>
					<h2> {titulo} </h2>

					<p> {nombreAsesor} </p>
					<p> {fecha} </p>
					<NoteTable />
					<ObservationsListView />
					<p> {comentario} </p>
				</div>
			</Page>
		</>
	)
}

export default OrderChange
