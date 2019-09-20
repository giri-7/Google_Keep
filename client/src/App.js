import React, {Component} from 'react';
import { GoogleLogin } from 'react-google-login';

class Home extends Component{

    state = {
      userDetails: {},
      errors: {}
    }

    responseGoogle(response){
        if(response){
          let googleUser = {
            image: response.profileObj.imageUrl,
            email: response.profileObj.email,
            name: response.profileObj.name
          }
          this.props.history.push('/dashboard');
          localStorage.setItem('userLogin', JSON.stringify(googleUser))
        }   
    }


    handleChange(inputProps, event){
      let events = this.state.userDetails;
      events[inputProps] = event.target.value;
      this.setState({
        events
      }, () => {
        this.handleValidation();
      })
    }

    handleValidation(){
        let event = this.state.userDetails;
        let errors = {};
        let formIsValid = true;

        //Email
        if(!event["email"]){
           formIsValid = false;
           errors["email"] = "Email Cannot be empty";
        } else if(typeof event["email"] !== "undefined"){
           let lastAtPos = event["email"].lastIndexOf('@');
           let lastDotPos = event["email"].lastIndexOf('.');

           if (!(lastAtPos < lastDotPos && lastAtPos > 0 && event["email"].indexOf('@@') == -1 && lastDotPos > 2 && (event["email"].length - lastDotPos) > 2)) {
              formIsValid = false;
              errors["email"] = "Email is not valid !!!";
            }
        }

        //Password
        if(!event["password"]){
           formIsValid = false;
           errors["password"] = "Password Cannot be empty";
        }

       this.setState({errors: errors});
       return formIsValid;
    }


    loginUser(e){
      e.preventDefault();
      if(this.handleValidation()){
          localStorage.setItem('userLogin', JSON.stringify(this.state.userDetails))
          this.props.history.push('/dashboard');
          this.clearData();
      }
    }

    clearData(){
      this.state.userDetails['email'] = "";
      this.state.userDetails['password'] = "";
      this.setState({
        userDetails: this.state.userDetails
      })
    }


  render(){

    return(
      <div>
        <div className="mainFormContent">
        <div className="signinForm">

        <h1 className="text-center mb-4">Welcome to Keep Notes</h1>
        <div className="container">
        <div className="row">
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 glogin">
               <GoogleLogin
                clientId="594864660960-fdro6jmhql5vbqri40s39g0mvvcno6c1.apps.googleusercontent.com"
                img="/assets/google.png"
                onSuccess={this.responseGoogle.bind(this)}
                onFailure={this.responseGoogle.bind(this)}
                cookiePolicy={'single_host_origin'}
              />
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 text-center">
              <form onSubmit={this.loginUser.bind(this)}>
                <input type="email" value={this.state.userDetails.email} className="formFields" onChange={this.handleChange.bind(this, 'email')} placeholder="Enter Email" />
                 <div className="error-text">{this.state.errors['email']}</div> <br />
                 
                <input type="password" value={this.state.userDetails.password}  className="formFields" onChange={this.handleChange.bind(this, 'password')} placeholder="Enter Password" />
                 <div className="error-text">{this.state.errors['password']}</div> <br />
                 
                <button className="btn btn-success" style={{width: "50%"}} type="submit">Login / Signup</button>
              </form>
            </div>
        </div>
        </div>

       

        </div>
       </div>
      </div>

    );
  }
}


export default Home;
