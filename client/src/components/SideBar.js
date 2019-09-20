import React, {Component} from 'react';

class SideBar extends Component{

	state = {
		
	}

	render(){
		return(
			<div className="sideBarContent mt-2">
				<p className="sideMenuTitle activeCls"><img src="/assets/lightbulb.svg" alt="Notes" width="20px" className="mr-4" /> Notes</p>
				<p className="sideMenuTitle"><img src="/assets/bell-ring-alarm.svg" alt="Notes" width="20px" className="mr-4" /> Reminders</p>
				<hr />
				<p className="sideMenuTitle"><img src="/assets/edit.svg" alt="Label" width="20px" className="mr-4" />  Labels</p>
				<hr />
				<p className="sideMenuTitle"><img src="/assets/garbage.svg" alt="Notes" width="20px" className="mr-4" /> Trash</p>
			</div>
		);
	}
}




export default SideBar;