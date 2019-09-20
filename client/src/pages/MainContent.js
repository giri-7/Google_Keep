import React, {Component} from 'react';

export default class MainContent extends Component{
	state = {
		toggleNotesSection: false,
		imgDisplay: false,

		task: {
			notes: "",
			title: ""
		},
		taskImg: "",
		imageBase64: "",

		taskList: [],

		listSection: false,

		newListText: "",
		lists: [],

		modalEdit: [],
		editedIndex: ""
	}

	componentDidMount(){
		if(JSON.parse(localStorage.getItem('taskList'))){
			this.setState({
				taskList: JSON.parse(localStorage.getItem('taskList'))
			})
		}
	}


	openText(){
		this.setState({
			toggleNotesSection: true
		})
	}



	handleFileChange(e){

		    // get the files
    let files = e.target.files;

    console.log(files[0])

    // Process each file
    var allFiles = [];
    for (var i = 0; i < files.length; i++) {

      let file = files[i];

      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {

        // Make a fileInfo Object
        let fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000) + ' kB',
          base64: reader.result,
          file: file,
        };

        // Push it to the state
        allFiles.push(fileInfo);
        this.setState({
        	imageBase64: allFiles[0].base64,
        	imgDisplay: true,
        	taskImg: allFiles[0].base64
        })
      }
    }


	}

	removeImg(){
		let preview = document.getElementById('uploadImage');
		preview.src = "";
		this.setState({
	  		imgDisplay: false
	  	})
	}

	handleChange(inputProps, event){
		let events = this.state.task;
		events[inputProps] = event.target.value;
		this.setState({
			events
		})
	}

	closeText(){
		if(this.state.task.title || this.state.task.notes){
			this.setState({
				toggleNotesSection: false
			}, () => {
				this.state.task['taskImg'] = this.state.taskImg;
				this.state.taskList.push(this.state.task);
				this.setState({
					taskList: this.state.taskList
				}, () => {
					console.log(this.state.taskList)
					localStorage.setItem('taskList', JSON.stringify(this.state.taskList));
					this.setState({
						task: {
							notes: "",
							title: ""
						},
						taskImg: "",
						imgDisplay: false,
						imageBase64: ""
					})
				})
			})
		}
		else{
			this.setState({
				imgDisplay: false,
				toggleNotesSection: false
			})
		}

	}

	openList(){
		this.setState({
			toggleNotesSection: false,
			listSection: true
		})
	}

	closeTextList(){
		let taskObj = {};
		taskObj['list'] = this.state.lists;
		this.state.taskList.push(taskObj);
		this.setState({
			taskList: this.state.taskList,
			listSection: false
		}, () => {
			console.log(this.state.taskList)
			localStorage.setItem('taskList', JSON.stringify(this.state.taskList));
		})
	}

	newlist(e){
		this.setState({
			newListText : e.target.value
		}, () => {
			let obj = {};
			obj['text'] = this.state.newListText;
			obj['toggle'] = null;
			this.state.lists.push(obj);
			this.setState({
				lists: this.state.lists,
				newListText: ""
			}, () => {
				console.log(this.state.lists)
			})
		})
	}

	deleteText(id){
		console.log(id)
		if (id > -1) {
			let arrays = this.state.lists;
		  	 arrays.splice(id, 1);
		  	 console.log(arrays)
		  	 this.setState({
				lists: [...arrays]
			})
		}
	}

	editableChange(index, e){
		this.state.lists[index].text = e.target.value;
		this.setState({
			lists: this.state.lists
		}, () => {
				console.log(this.state.lists)
			})
	}

	checkboxToggle(id, e){
			this.state.lists[id].toggle = e.target.checked;
			this.setState({
				lists: this.state.lists
			}, () => {
				console.log(this.state.lists)
			})
	}

	selectedTab(data, editedIndex){
		let newArray = [];
		newArray.push(data);
		this.setState({
			modalEdit: newArray,
			editedIndex: editedIndex
		})
	}	

	deleteTask(id){
		console.log(id)
		if (id > -1) {
			let arrays = this.state.taskList;
		  	 arrays.splice(id, 1);
		  	 console.log(arrays)
		  	 this.setState({
				taskList: arrays
			}, () => {
				localStorage.setItem('taskList', JSON.stringify(this.state.taskList));
			})
		}
	}


	render(){
		//search option

		return(
			<div>
			<div className="mainContent">

				<img id="uploadImage" className={this.state.imgDisplay ? "displayImage": null} src={this.state.imageBase64} width="100%" />
				{(this.state.imgDisplay) ? 
				<span className="deleteImg" onClick={this.removeImg.bind(this)}>X</span>: null}
				<input type="text" value={this.state.task.title}
					 placeholder={this.state.toggleNotesSection ? "Title here" : "Take a note"} onFocus={this.openText.bind(this)} onChange={this.handleChange.bind(this, "title")} className="noteField" />
				
				{(this.state.toggleNotesSection) ? null :
				<code>
				<label for="upload-photo" className="imgAddCls"><img className="uploadFile" src="/assets/picture.svg" width="25px" alt="Upload Folder" />
					<input type="file" name="photo" id="upload-photo" workingfile onChange={this.handleFileChange.bind(this)} style={{display: "none"}} />
				</label>
				<img src="/assets/list.svg" className="imgAddCls mr-3" width="25px" onClick={this.openList.bind(this)}  />
				</code>}

				{(this.state.toggleNotesSection) ? 
					<div className="subContent">
						<input type="text" value={this.state.task.notes} placeholder="Take a note..."  className="subNotes" onChange={this.handleChange.bind(this, "notes")}  />
						<div className="closeCls">
							<label for="upload-photo"><img className="uploadFile" src="/assets/picture.svg" width="35px" alt="Upload Folder" />
								<input type="file" name="photo" id="upload-photo" workingfile onChange={this.handleFileChange.bind(this)} style={{display: "none"}} />
							</label>
							<img src="/assets/list.svg" className="uploadFile mr-3" width="35px" onClick={this.openList.bind(this)}  />
				
							<label className="closeToggle" onClick={this.closeText.bind(this)}>Close</label>
						</div>
					</div> :
					
					null
				}

				{(this.state.listSection) ? 
					<code>
					{(this.state.lists.map((data, id) => {
						console.log(data)
						return(
							<span>
								<input type="checkbox" className="checkCls mt-2" onChange={this.checkboxToggle.bind(this, id)} />
								<input value={data.text} className={(data.toggle) ? "editableText addCls" : "editableText" } onChange={this.editableChange.bind(this, id)} />
								<span className="cancelText" onClick={this.deleteText.bind(this, id)}>X</span>
							</span>

						);
					}))}
					<input placeholder="Add a list...." className="addTask" value={this.state.newListText} onChange={this.newlist.bind(this)} />
					<label className="closeToggleList" onClick={this.closeTextList.bind(this)}>Close</label>
					</code>
					: null
				}
				


			</div>

			<div className="container">
				<div className="row p-3 mt-5">
					{(this.state.taskList.map((data, id) => {
						
						if(data.list){
							console.log(data.list)
							return(
							<div className="col-sm-12 col-md-6 col-lg-4">
								<div className="boxDesign">
									
									{(data.list.map((item, idx) => {
										console.log(item)
										return(	
											<span key={idx}>
												<input type="checkbox" className="overallCheck" />
												<p className="ml-3">{idx} . {item.text}</p>
												<button className="btn btn-danger" onClick={this.deleteTask.bind(this, id)}>Delete</button>
											</span>
										);
									}))}
								</div>
							</div>)
							
						}
						return(
							<div className="col-sm-12 col-md-6 col-lg-4">
								<div className="boxDesign">
									<img src={data.taskImg} width="100%" />
									<p>{data.title}</p>
									<p>{data.notes}</p>
									<button className="btn btn-danger" onClick={this.deleteTask.bind(this, id)}>Delete</button>

								</div>
							</div>
						);
						
						
					}))}
					
					{(this.state.taskList.length === 0) ?
						<div style={{width: "100%"}}>

							<p  className="text-center">
							<img src="/assets/lightbulb.svg" alt="Notes" width="90px" className="mb-4" /> 
							<p>Notes Add to Appear</p></p>
						</div> :
					null }
				</div>
			</div>
			</div>
		);
	}
}