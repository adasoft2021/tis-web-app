import React, { useState } from 'react'
import styled from 'styled-components'
import { IconContext } from 'react-icons'
import { FiPlus, FiMinus } from 'react-icons/fi'
import { usePublicationHistory } from '../context/providers/PublicationContext'

const AccordionSection = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: relative;
	height: 10vh;
	background: #fff;
`

const Container = styled.div`
	position: absolute;
	top: 30%;
	width: 1200px;
	box-shadow: 2px 10px 35px 1px rgba(153, 153, 153, 0.3);
`

const Wrap = styled.div`
	background: #a0a0a0;
	color: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	text-align: center;
	cursor: pointer;
	h1 {
		padding: 1rem;
		font-size: 1rem;
	}
	span {
		margin-right: 1.5rem;
	}
`

const Dropdown = styled.div`
	background: #ffffff;
	color: #00ffb9;
	width: 100%;
	height: 100px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-bottom: 1px solid #00ffb9;
	border-top: 1px solid #00ffb9;
	p {
		font-size: 1rem;
	}
`

const Accordion = () => {
	const [clicked, setClicked] = useState(false)

	const { publications } = usePublicationHistory('SPECIFICATION_SHEET')

	const toggle = (index) => {
		if (clicked === index) {
			return setClicked(null)
		}
		setClicked(index)
	}

	return (
		<IconContext.Provider value={{ color: '#00FFB9', size: '25px' }}>
			<AccordionSection>
				<Container>
					{publications.map((item) => {
						return (
							<div key={item.id}>
								<Wrap onClick={() => toggle(item.id)}>
									<h1>{item.title}</h1>

									<span>
										{clicked === item.id ? (
											<FiMinus />
										) : (
											<FiPlus />
										)}
									</span>
								</Wrap>
								{clicked === item.id ? (
									<Dropdown>
										<p>{item.fileUrl}</p>
									</Dropdown>
								) : null}
							</div>
						)
					})}
				</Container>
			</AccordionSection>
		</IconContext.Provider>
	)
}

export default Accordion
