import React, {Component} from 'react';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import MainContent from './pages/MainContent';

export default class Dashboard extends Component{

	state = {
		toggle: true,
		search: ""
	}

	toggleBack(){
		this.setState({
			toggle: !this.state.toggle
		})
	}

	searchTitle(data){
		this.setState({
			search: data
		})
	}

	render(){
	return(
		<div>
			<NavBar toggleBack={this.toggleBack.bind(this)} searchTitle={this.searchTitle.bind(this)} />
			<div className="row">
				<div className={(this.state.toggle) ? "hideSideBar"  : "showSideBar col-sm-12 col-md-3 col-lg-3"}>	
					<SideBar />
				</div>
				<div className={(this.state.toggle) ? "col-sm-12 col-md-12 col-lg-12" : "col-sm-12 col-md-9 col-lg-9"}>
					<div className="container">
						<MainContent search={this.state.search} />
					</div>
				</div>
			</div>
		</div>	
	);
	}


}

