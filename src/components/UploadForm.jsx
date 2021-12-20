import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, InputGroup, Row } from 'react-bootstrap'
import './drop-file-input.scss'
import Swal from 'sweetalert2'
import { app } from '../fb'
import { useToast } from '../context/providers/ToastContext'
import { useSpaceAnswer } from '../context/providers/SpaceAnswerContext'
import { useUserCredentials } from '../context/providers/UserCredentialsContext'
import styles from './PostForm.module.scss'

const UploadForm = (props) => {
	const sprintf = require('sprintf-js').sprintf

	const { showToast } = useToast()

	const { spaceAnswer, createSpaceAnswer } = useSpaceAnswer()
	const { id } = useUserCredentials()

	const [fileUrl, setFileUrl] = useState('')
	const [filename, setfilename] = useState('')

	const uploadFile = async (e) => {
		const file = e.target.files[0]
		const storageRef = app.storage().ref('PRUEBA 2')
		showToast({
			color: 'info',
			message: 'El archivo PDF se esta cargando...',
		})
		const filePath = storageRef.child(file.name)

		setfilename(file.name)
		try {
			await filePath.put(file)
			const fileDownloadUrl = await filePath.getDownloadURL()

			setFileUrl(fileDownloadUrl)
			showToast({
				color: 'info',
				message: 'Archivo Cargado.',
			})
		} catch {
			showToast({
				color: 'danger',
				message: 'No se pudo subir el archivo',
			})
		}
	}

	useEffect(() => {
		if (spaceAnswer) {
			Swal.fire('Subido!', '', 'success')
		}
	}, [spaceAnswer])
	return (
		<>
			<div className='mt-3 mb-3'>
				<Form>
					<Form.Label className='mb-2 fs-4'>
						Archivo adjunto
					</Form.Label>
					<Row
						className={`${styles['drag-area']} rounded bg-light text-dark p-4`}
					>
						<Form.Group>
							<div className='d-flex flex-column align-items-center'>
								<h4>Arrastra y suelta tu archivo</h4>
								<h4>o</h4>
								<Form.Label className='btn btn-primary'>
									Selecciona tu archivo
								</Form.Label>
							</div>
							<InputGroup
								className={styles['file-upload-input']}
								hasValidation
							>
								<Form.Control
									type='file'
									onChange={uploadFile}
								/>
							</InputGroup>
						</Form.Group>
					</Row>
					{fileUrl === '' ? null : (
						<>
							<p className='drop-file-previewtitle'>
								Archivos a subir
							</p>
							<div className='drop-file-preview__item'>
								<>{filename}</>
							</div>
							<Button
								className='m-3'
								variant='success'
								onClick={() =>
									Swal.fire({
										title: sprintf('Se subira archivo'),
										showCancelButton: true,
										confirmButtonText: 'Subir',
									}).then((result) => {
										if (result.isConfirmed) {
											console.log(fileUrl)

											createSpaceAnswer({
												spaceId: 1,
												spaceAnswerDTO: {
													spaceId: 1,
													createdById: id,
													files: [
														{
															name: filename,
															url: fileUrl,
															deleted: false,
														},
													],
												},
											})
										}
									})
								}
							>
								ENVIAR
							</Button>
						</>
					)}
				</Form>
			</div>
		</>
	)
}

UploadForm.propTypes = {
	onFileChange: PropTypes.func,
}

export default UploadForm
