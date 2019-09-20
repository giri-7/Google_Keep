import React, {Component} from 'react';
import {BrowserRouter, Switch, HashRouter} from 'react-router-dom';
import {Route} from 'react-router';

import App from './App';
import Dashboard from './dashboard';

export default class Navigation extends Component{
	render(){
		return(
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={App} />
					<Route exact path="/dashboard" component={Dashboard} />
				</Switch>
			</BrowserRouter>
		);
	}
}