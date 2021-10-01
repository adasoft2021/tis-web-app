import { Route, Switch } from 'wouter'
import { WelcomeProvider } from '../context/providers/WelcomeContext'
import { HomePage, Board, NotFoundPage } from '../pages'

export default function AppRouter() {
	return (
		<Switch>
			<Route
				path='/'
				component={(props) => (
					<WelcomeProvider>
						<HomePage {...props} />
					</WelcomeProvider>
				)}
			/>
			<Route path='/tablero' component={Board} />
			<Route path='/404' component={NotFoundPage} />
			<Route component={NotFoundPage} />
		</Switch>
	)
}
