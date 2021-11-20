import React from 'react'
import { Button } from 'react-bootstrap'
import Swal from 'sweetalert'

export default function CreateButton({ onHide, formik }) {
	return (
		<div>
			<div className=''>
				<Button
					className='m-3'
					variant='success'
					onClick={() =>
						Swal({
							text: 'Seguro de lo que va a enviar.',
							icon: 'warning',
							buttons: ['Seguir editando', 'Si'],
						}).then((answer) => {
							if (answer) {
								formik.submitForm.call()
								onHide()
								formik.handleReset()
							}
						})
					}
				>
					CREAR
				</Button>
			</div>
		</div>
	)
}
