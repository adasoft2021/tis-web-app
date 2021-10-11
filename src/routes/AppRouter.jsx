import { Route, Switch } from 'wouter'
import { WelcomeProvider } from '../context/providers/WelcomeContext'
import { ReviewProvider } from '../context/providers/ReviewContext'
import { HomePage, Board, NotFoundPage, Revision } from '../pages'
import Test from '../pages/Test'
import { ProposalProvider } from '../context/providers/ProposalContext'

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
			<Route
				path='/test'
				component={(props) => (
					<ProposalProvider>
						<Test {...props} />
					</ProposalProvider>
				)}
			/>
			<Route path='/404' component={NotFoundPage} />
			<Route
				path='/review'
				component={(props) => (
					<ReviewProvider>
						<Revision {...props} />
					</ReviewProvider>
				)}
			/>
			<Route component={NotFoundPage} />
		</Switch>
	)
}
