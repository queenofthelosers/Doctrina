import React from "react"
import CourseCard from "./CourseCard";
import InstructorNavbar from "./InstructorNavbar"
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
            </div>
        )
    }
}

export default InstructorDashboard