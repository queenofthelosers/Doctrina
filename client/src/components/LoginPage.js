
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
        window.location.href = "/instructor"
    }

    render(){
        
        return(
        <div className="bgDiv">
            <div className = "containerDiv">
                <div className = "login1"><center><b>Student Login</b></center></div>

                <div className= "login2"><center><b>Instructor Login</b></center></div>
            </div>
        </div>
        
        );
    }
}

export default LoginPage;
