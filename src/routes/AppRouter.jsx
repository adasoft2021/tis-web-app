import { Route, Switch } from 'wouter'
import { ReviewProvider } from '../context/providers/ReviewContext'
import { Board, NotFoundPage, Review } from '../pages'

export default function AppRouter() {
	return (
		<Switch>
			<Route
				path='/'
				component={(props) => (
					<ReviewProvider>
						<Review {...props} />
					</ReviewProvider>
				)}
			/>
			<Route path='/tablero' component={Board} />
			<Route path='/404' component={NotFoundPage} />
			<Route component={NotFoundPage} />
		</Switch>
	)
}
