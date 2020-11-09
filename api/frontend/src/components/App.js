import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from './layout/Header';
import Login from './accounts/Login';
import Register from './accounts/Register';
import PrivateRoute from './common/PrivateRoute';
import Quiz from './quiz/Quiz';

import { Provider } from 'react-redux';
import { batchActions } from 'redux-batched-actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import store from '../store';
import { loadUser } from '../actions/auth';
import { loadQuiz } from '../actions/quiz';

// import Quiz from './quiz/Quiz';

class App extends Component {
	constructor (props) {
		super(props)
		this.state = {
			quiz: {}
		}
		store.subscribe(() => {
			this.setState({
			  quiz: store.getState().quiz_details.quiz
			});
		  });
	}
	
	componentDidMount() {
		store.dispatch(batchActions([loadUser(), loadQuiz()],'DO_BOTH'))

		store.subscribe(() => {
			this.setState({
			  quiz: store.getState().quiz_details.quiz
			});
		  });
	}

	render() {
		// console.log('quiz',this.state)
		return (
			<Provider store={store}>
				<Router>
					<Fragment>
						<Header />
						<div className='container'>
							<Switch>
								<PrivateRoute exact path="/" component={Quiz} quiz={this.state.quiz} />
								
								<Route exact path="/register" component={Register} />
								<Route exact path="/login" component={Login} />
							</Switch>
						</div>
					</Fragment>
				</Router>
			</Provider>
		)
	}
}

// const mapStateToProps = state => ({
//     quiz: state.quiz_details.quiz_details
// });

// export default connect(mapStateToProps)(App);

ReactDOM.render(<App />,document.getElementById('app'));