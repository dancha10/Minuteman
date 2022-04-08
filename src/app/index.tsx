import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'

import { withProviders } from 'app/providers'

const colors: string[] = ['tomato', 'yellow', 'green', 'orange', 'blue', 'red', 'chocolate', 'coral', 'darkcyan']

const randomBackground = (): string => colors[Math.floor(Math.random() * colors.length)]

const Wrapper = styled.section<{ readonly background: string }>`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: background-color 0.2s linear;
	color: white;
	background: ${({ background }) => background};
`

const Title = styled.h1`
	font-size: 96px;
`

const App: FC = () => {
	const [currentBackground, setCurrentBackground] = useState(() => randomBackground())
	useEffect(() => {
		setInterval(() => {
			setCurrentBackground(randomBackground())
			console.warn('Created by Bruh')
		}, 3000)
	}, [])

	return (
		<Wrapper background={currentBackground}>
			<Title>Start template</Title>
		</Wrapper>
	)
}

export default withProviders(App)
