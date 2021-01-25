import React from "react"
import axios from "axios"
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
    }

    validateUser()
    {
        let username = this.state.username;
        let password = this.state.password;
        //make axios call that gets data from mongo for corresponding username,
        let obtainedPasswd = "Password from MongoDB";
        if(password = obtainedPasswd)
        {
            localStorage.setItem('token','instructor');
        }
        else
        {
            console.log("Wrong details");
        }
    }

    render(){
        return(
            <div>
                This is the instructor login page
                <br/>
                Name : <input type = "text"/>
                Password : <input type = "password"/>
                <button onClick = {this.validateUser}> Sign in </button>
            </div>
        )
    }
}

export default InstructorLogin