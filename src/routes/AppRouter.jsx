import { Route, Switch } from 'wouter'
import { WelcomeProvider } from '../context/providers/WelcomeContext'
import { HomePage, NotFoundPage, Revision } from '../pages'

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
			<Route path='/404' component={NotFoundPage} />
			<Route path='/review' component={Revision} />
			<Route component={NotFoundPage} />
		</Switch>
	)
}
