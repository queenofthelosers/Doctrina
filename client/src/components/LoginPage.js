
import React from 'react'
import "../stylesheets/Login.css"
import axios from 'axios'

class LoginPage extends React.Component{
    
    constructor(props)
    {
        super(props);
        this.instructorLogin = this.instructorLogin.bind(this)
    }

    instructorLogin()
    {

    }
    render(){
        
        return(
        <div className="bgDiv">
            <div className = "containerDiv">
                <div className = "login1"><center><b>Student Login</b></center></div>

                <div className= "login2"><center><b><a href="http://localhost:8080/auth/google">Instructor Login</a></b></center></div>
            </div>
        </div>
        
        );
    }
}

export default LoginPage;
