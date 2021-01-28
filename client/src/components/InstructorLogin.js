import React from "react"
import axios from "axios"
import "../stylesheets/InstructorLogin.css"
class InstructorLogin extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            username : "",
            password : ""
        }
        this.validateUser = this.validateUser.bind(this);
        this.handleFormInputs = this.handleFormInputs.bind(this);
        this.goBack = this.goBack.bind(this)
    }

    validateUser()
    {
        let username = this.state.username;
        let password = this.state.password;
        //make axios call that gets data from mongo for corresponding username,
        const submittedInformation = {
            username : this.state.username,
            password : this.state.password
        }
        JSON.stringify(submittedInformation)
        // axios.post("http://localhost:8080/api/validate_instructor",{submittedInformation})
        // .then((res)=>{
        //     console.log(res.data);
        // })
        // console.log(submittedInformation);
        axios.post("http://localhost:8080/api/validate_instructor",submittedInformation,{headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }}).then((res)=>{
              console.log(res.data)
          }).catch((err)=>{
              console.log(err)
          })
          console.log(submittedInformation)
    }

    handleFormInputs(event)
    {
        let name = event.target.name;
        let val = event.target.value;
        this.setState({[name]:val});
    }
    goBack()
    {
        window.location.href = "/"
    }

    render(){
        return(
          <div>
            <div className = "form-container">
            <p class="title is-1 is-spaced">Instructor Login</p>
            <p class="subtitle is-3">Sign in using instructor credentials</p>
            <div class="field">
            <label class="label">Username</label>
            <div class="control">
                <input class="input" type="text" placeholder="Text input" onChange = {this.handleFormInputs} name = "username"/>
            </div>
            </div>

            <div class="field">
            <label class="label">Password</label>
            <div class="control has-icons-left has-icons-right">
            <input class="input is-success" type="password" placeholder="Text input"  onChange= {this.handleFormInputs} name = "password"/>
            {/* <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
            </span> */}
            {/* <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
            </span> */}
            </div>
            
            </div>

{/* <div class="field">
  <label class="label">Email</label>
  <div class="control has-icons-left has-icons-right">
    <input class="input is-danger" type="email" placeholder="Email input" value="hello@"/>
    <span class="icon is-small is-left">
      <i class="fas fa-envelope"></i>
    </span>
    <span class="icon is-small is-right">
      <i class="fas fa-exclamation-triangle"></i>
    </span>
  </div>
  <p class="help is-danger">This email is invalid</p>
</div> */}
{/* 
<div class="field">
  <label class="label">Subject</label>
  <div class="control">
    <div class="select">
      <select>
        <option>Select dropdown</option>
        <option>With options</option>
      </select>
    </div>
  </div>
</div> */}




{/* <div class="field">
  <div class="control">
    <label class="radio">
      <input type="radio" name="question"/>
      Yes
    </label>
    <label class="radio">
      <input type="radio" name="question"/>
      No
    </label>
  </div>
</div> */}
    <center>
    <div class="field is-grouped">
    <div class="control">
        <button class="button is-link" onClick={this.validateUser}>Sign In</button>
    </div>
    <div class="control">
        <button class="button is-link is-light" onClick = {this.goBack}>Back</button>
    </div>
    </div>
    </center>
</div>
</div>
        )
    }
}

export default InstructorLogin