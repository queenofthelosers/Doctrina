
import React from 'react'
import "../stylesheets/Login.css"
import { Link } from "react-router-dom"
import rightarrow from "../images/arrow_right.png"
import FrontCarousel from "./FrontCarousel.js"
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
        
            <div className = "carousel">
            <FrontCarousel></FrontCarousel></div>
            <br/><br/><br/><br/>
            <div className = "buttonContainer">
                
                <Link to = "/instructorlogin">
                <div class = "figButton" onClick = {this.instructorLogin}>
                    <b>Instructor Login</b>
                    <img src = {rightarrow} className = "rightArrow"></img>
                </div>
                </Link>

                
                <div class = "figButton" onClick = {this.setToken}>
                    <b>Student Login</b>
                    <img src = {rightarrow} className = "rightArrow"></img>
                </div>
               
                
            </div>
        
        </div>
        
        );
    }
}

export default LoginPage;
