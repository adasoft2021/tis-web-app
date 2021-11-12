import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { IoIosAdd } from 'react-icons/io'
import ModalCreateSpace from './ModalCreateSpace'

export default function CreateSpace() {
	const [modalShowCreateSpace, setModalShowCreateSpace] = useState(false)
	return (
		<div>
			<Button
				variant='primary'
				className='rounded-circle'
				style={{ width: '56px', height: '56px' }}
				onClick={() => setModalShowCreateSpace(true)}
			>
				<IoIosAdd className='text-light' size={32} />
			</Button>

			<ModalCreateSpace
				show={modalShowCreateSpace}
				onHide={() => setModalShowCreateSpace(false)}
			/>
		</div>
	)
}
