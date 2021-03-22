import React from "react"
import CourseCard from "./CourseCard";
import InstructorNavbar from "./InstructorNavbar"
import { Link } from "react-router-dom"

class InstructorDashboard extends React.Component
{
    constructor(props){
        super(props);
        this.state = {

        }
        
    }
    
    

    render(){
        return(
            <div>
            <InstructorNavbar></InstructorNavbar>
            Welcome {window.localStorage.getItem("instructor")}
            <CourseCard></CourseCard>
            <button> <Link to = "/editor">Go to Editor</Link></button>
            </div>
        )
    }
}

export default InstructorDashboard