import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import './drop-file-input.scss'
import Swal from 'sweetalert2'
import { app } from '../fb'

import { ImageConfig } from '../config/ImageConfig'
import uploadImg from '../assets/cloud1.png'
import { useSpaceAnswer } from '../context/providers/SpaceAnswerContext'
import { useUserCredentials } from '../context/providers/UserCredentialsContext'

const UploadForm = (props) => {
	const wrapperRef = useRef(null)
	const sprintf = require('sprintf-js').sprintf
	const [fileList, setFileList] = useState([])

	const onDragEnter = () => wrapperRef.current.classList.add('dragover')

	const onDragLeave = () => wrapperRef.current.classList.remove('dragover')

	const onDrop = () => wrapperRef.current.classList.remove('dragover')

	const onFileDrop = (e) => {
		const newFile = e.target.files[0]
		if (newFile) {
			const updatedList = [...fileList, newFile]
			setFileList(updatedList)
			props.onFileChange(updatedList)
		}
	}

	const fileRemove = (file) => {
		const updatedList = [...fileList]
		updatedList.splice(fileList.indexOf(file), 1)
		setFileList(updatedList)
		props.onFileChange(updatedList)
	}
	const handleUpload = async () => {
		fileList.forEach(async (file) => {
			const storageRef = app.storage().ref()
			const filePath = storageRef.child(file.name)
			await filePath.put(file)
			const fileDownloadUrl = filePath.getDownloadURL()
			fileRemove(file)
			const updatedList = [
				...fileList,
				{ name: file.name, url: fileDownloadUrl },
			]
			setFileList(updatedList)
		})
	}

	const { spaceAnswer, createSpaceAnswer } = useSpaceAnswer()
	const { id } = useUserCredentials()
	return (
		<>
			<div
				ref={wrapperRef}
				className='drop-file-input'
				onDragEnter={onDragEnter}
				onDragLeave={onDragLeave}
				onDrop={onDrop}
			>
				<div className='drop-file-input__label'>
					<img src={uploadImg} alt='' />
					<p>Arrastra y suelta aqui</p>
				</div>
				<input type='file' value='' onChange={onFileDrop} />
			</div>
			{fileList.length > 0 ? (
				<>
					<div className='drop-file-preview'>
						<p className='drop-file-previewtitle'>
							Archivos a subir
						</p>
						{fileList.map((item, index) => (
							<div
								key={index}
								className='drop-file-preview__item'
							>
								<img
									src={
										ImageConfig[item.type.split('/')[1]] ||
										ImageConfig.default
									}
									alt=''
								/>
								<div className='drop-file-preview__item__info'>
									<p>{item.name}</p>
									<p>{item.size}B</p>
								</div>
								<span
									className='drop-file-preview__item__del'
									onClick={() => fileRemove(item)}
								>
									x
								</span>
							</div>
						))}
					</div>
					<Button
						className='text-light btn-success'
						onClick={() =>
							Swal.fire({
								title: sprintf(
									'Se subira %d archivos',
									fileList.length
								),
								showCancelButton: true,
								confirmButtonText: 'Subir',
							}).then((result) => {
								if (result.isConfirmed && spaceAnswer) {
									handleUpload()
									createSpaceAnswer({
										spaceId: 1,
										spaceAnswerDTO: {
											spaceId: 1,
											createdById: id,
											files: fileList.map((file) => ({
												name: file.name,
												url: file.url || '',
												deleted: false,
											})),
										},
									})
									Swal.fire('Subido!', '', 'success')
								}
							})
						}
					>
						Subir
					</Button>
				</>
			) : null}
		</>
	)
}

UploadForm.propTypes = {
	onFileChange: PropTypes.func,
}

export default UploadForm
