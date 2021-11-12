import React from 'react'
import { Button } from 'react-bootstrap'
import Swal from 'sweetalert'

export default function CloseButton({ onHide, formik }) {
	return (
		<div>
			<div className=' d-flex justify-content-end'>
				<Button
					className='text-light btn-danger'
					onClick={() =>
						Swal({
							text: ' ¿Seguro que quiere salir? Se borrará los datos ingresados.',
							icon: 'warning',
							buttons: ['Seguir editando', 'Si'],
						}).then((answer) => {
							if (answer) {
								onHide()
								formik.handleReset()
							}
						})
					}
				>
					X
				</Button>
			</div>
		</div>
	)
}
