import React, {Component} from 'react';

export default class NavBar extends Component{

	state = {
		logoName: ""
	}

	componentDidMount(){
		if(JSON.parse(localStorage.getItem('userLogin'))){
			this.setState({
				logoName: JSON.parse(localStorage.getItem('userLogin')).email
			})
		}
	}

	toggleSideBar(){
		this.props.toggleBack();
	}	

	searchTitle(event){
		this.props.searchTitle(event.target.value);
	}

	render(){
	return(
		<div className="navigationSection">
			<div className="row">
				<div className="col-sm-12 col-md-2 col-lg-2 pt-3">
					<span className="tealIcon" onClick={this.toggleSideBar.bind(this)}>☰</span>
					<span className="titleName">Keep_Notes</span>
				</div>
				<div className="col-sm-12 col-md-7 col-lg-7">
					<img src="/assets/search.svg" width="20px" className="searchIcon" />
					<input type="text" className="searchBar" placeholder="Search" width="100%" onChange={this.searchTitle.bind(this)} />
		
				</div>
				<div className="col-sm-12 col-md-3 col-lg-3 pr-5 text-right">
					<img src="/assets/refresh.svg" width="20px" className="icons" />
					<img src="/assets/settings.svg" width="20px" className="icons"  />
					<img src="/assets/dot-matrix.svg" width="20px" className="icons"  />
					<span className="logoUser"><label className="iconsText">
					{this.state.logoName.charAt(0).toUpperCase()}
					</label></span>
				</div>
			</div>
		</div>	
	);
	}

}