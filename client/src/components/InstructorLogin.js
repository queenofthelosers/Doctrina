import React from "react"
import axios from "axios"
import "../stylesheets/InstructorLogin.css"
import rightarrow from "../images/arrow_right.png"

class InstructorLogin extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            username : "",
            password : ""
        }
        
        this.goBack = this.goBack.bind(this)
    }

    validateUser = ()=>
    {
        let username = this.state.username;
        let password = this.state.password;
  
        const submittedInformation = {
            username : this.state.username,
            password : this.state.password
        }
        JSON.stringify(submittedInformation)
       
        axios.post("http://localhost:8080/api/validate_instructor",submittedInformation,{headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }}).then((res)=>{
              console.log(res.data)
              if(res.data.response == "Success")
              {
                window.location.href = "/instructor_dashboard"
                window.localStorage.setItem("instructor",username)
              }
              else{
                alert("Wrong details!")
              }
          }).catch((err)=>{
              console.log(err)
          })
          console.log(submittedInformation)
    }

    handleFormInputs = (event)=>
    {
        let name = event.target.name;
        let val = event.target.value;
        this.setState({[name]:val});
    }
    goBack = () =>
    {
        window.location.href = "/"
    }

    render(){
        return(
          <div className = "parentContainer">
            <div className = "loginContainer">
            <div className = "fbox">
              <div className = "loginForm">
                  <div class="field">
                  <label class="label t1">Username</label>
                  <div class="control">
                      <input class="input try1" type="text" placeholder="Text input" onChange = {this.handleFormInputs} name = "username"/>
                  </div>
                  </div>
                  <div class="field">
                  <label class="label t2">Password</label>
                  <div class="control has-icons-left has-icons-right">
                  <input class="input try1" type="password" placeholder="Text input"  onChange= {this.handleFormInputs} name = "password"/>
                  </div>
                  </div>
            </div>
            <br/>
            <center>
            <div className = "proceedButton" onClick = {this.validateUser}>
                <b>Proceed</b>
                <img src = {rightarrow}></img>
            </div>
            </center>
            
            </div>
            

    {/* <center>
    <div class="field is-grouped">
    <div class="control">
        <button class="button is-link" onClick={this.validateUser}>Sign In</button>
    </div>
    <div class="control">
        <button class="button is-link is-light" onClick = {this.goBack}>Back</button>
    </div>
    </div>
    </center> */}
</div>
</div>
        )
    }
}

export default InstructorLogin