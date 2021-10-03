import React from 'react'

function qualification({ descri, points, min, max, name, onchange }) {
	return (
		<div>
			<div className='row ' style={{ margin: 10, marginTop: 10 }}>
				<div className='col-md-9'>
					<h4>{descri}</h4>
				</div>
				<div className='col-md-1'>
					<input
						type='number'
						className='form-control'
						min={min}
						max={max}
						name={name}
						onChange={onchange}
					></input>
				</div>
				<div className='col-md-2'>
					<h4>{points}</h4>
				</div>
			</div>
		</div>
	)
}

export default qualification
