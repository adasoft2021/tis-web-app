import { Route, Switch } from 'wouter'
import { ObservationProvider } from '../context/providers/ObservationContext'
import { ProposalProvider } from '../context/providers/ProposalContext'
import { ReviewProvider } from '../context/providers/ReviewContext'
import { Board, NotFoundPage, Review } from '../pages'

export default function AppRouter() {
	return (
		<Switch>
			<Route
				path='/'
				component={(props) => (
					<ProposalProvider>
						<ObservationProvider>
							<ReviewProvider>
								<Review {...props} />
							</ReviewProvider>
						</ObservationProvider>
					</ProposalProvider>
				)}
			/>
			<Route path='/tablero' component={Board} />
			<Route path='/404' component={NotFoundPage} />
			<Route component={NotFoundPage} />
		</Switch>
	)
}
