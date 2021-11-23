import React from 'react'
import { Button } from 'react-bootstrap'

export default function CreateButton({ onHide, formik }) {
	return (
		<div>
			<div className=''>
				<Button
					type='submit'
					className='m-3'
					variant='success'
					onSubmit={formik.handleSubmit}
				>
					CREAR
				</Button>
			</div>
		</div>
	)
}
