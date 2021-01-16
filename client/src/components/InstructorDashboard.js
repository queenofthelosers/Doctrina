import React from "react"
import CourseCard from "./CourseCard"
class InstructorDashboard extends React.Component{
    constructor(props)
    {
        super(props);
    }
    render(){
        return(
            <div>
            "Authentication Completed, User details are : "
            <div>
                <center><b><h1>MY COURSES</h1></b><button>+</button></center>
                
            </div>

            <div className = "courseContainer">
                <CourseCard/>
                <CourseCard/>
            </div>
            
            </div>
        )
       
    }


}

export default InstructorDashboard;