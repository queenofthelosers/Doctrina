
import React from 'react'
import "../stylesheets/Login.css"
import { Link } from "react-router-dom"
class LoginPage extends React.Component{
    
    constructor(props)
    {
        super(props);
        this.setToken = this.setToken.bind(this)
    }

    setToken()
    {
        window.localStorage.setItem('token','student');
        const x = window.localStorage.getItem('token');
        console.log(x);
        window.location="http://localhost:8080/auth/google"
    }

    render(){
        
        return(
        <div className="bgDiv">
            <div className = "containerDiv">
                <div className = "login1" onClick = {this.instructorLogin}><center><b><Link to = "/instructorlogin">Instructor Login</Link></b></center></div>

                <div className= "login2"><center><b><a onClick={this.setToken}>Student Login</a></b></center></div>
            </div>
        </div>
        
        );
    }
}

export default LoginPage;
