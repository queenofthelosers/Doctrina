import React from "react"
import CourseCard from "./CourseCard";
import InstructorNavbar from "./InstructorNavbar"
import { Link } from "react-router-dom"
import "../stylesheets/InstructorDash.css"

class InstructorDashboard extends React.Component
{
    constructor(props){
        super(props);
        this.state = {

        }
        
    }
    
    render(){
        return(
            <div className = "parent">
            <InstructorNavbar signedInUser={window.localStorage.getItem("instructor")}></InstructorNavbar>
            Welcome {window.localStorage.getItem("instructor")}
            <br/><br/>
            <center style = {{color:"white"}}><b>My Courses</b></center>
            <br/><br/>
            <CourseCard></CourseCard>
            <button> <Link to = "/editor">Go to Editor</Link></button>
            </div>
        )
    }
}

export default InstructorDashboard