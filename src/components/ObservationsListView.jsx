import styles from './ObservationsListView.module.scss'

const ObservationsListView = () => {
	const listObservation = [
		{
			id: '1',
			observation:
				'Parte A: Acta de constitución, sección Plazo de duración, la vida de la empresa es minima y no genera confianza a TIS, ya que estas fechas no permiten manteniiento de software',
		},
		{
			id: '2',
			observation:
				'Parte A: Acta de constitución, sección Previsiones para reservas: que a la letra dice “En caso de falle-cimiento, impedimento o incapacidad sobreviniente de uno de los socios, los restantes continuarán con el giro social, juntamente con los herederos forzosos o legales o los representantes según el caso hasta la culminación de la gestión anual.”, para fines de este contrato los herederos no forma parte de la sociedad en ningun contexto. TIS solicita se corrija este apartado.',
		},
		{
			id: '3',
			observation:
				'Parte B: En la sección Propuesta de servicios: TIS solicita que la empresa especifique con claridad que lamodalidad del servicio es “Desarrollo de software”',
		},
	]
	return (
		<>
			<h4>Observaciones</h4>
			<ol className={styles.lista}>
				{listObservation.map((item) => (
					<li key={item.id}>{item.observation}</li>
				))}
			</ol>
		</>
	)
}

export default ObservationsListView
