import React from "react"
import CourseCard from "./CourseCard"
import axios from "axios"

class InstructorDashboard extends React.Component{
    
    constructor(props)
    {
        super(props);
        this.state = {
            name : "",
            emailID : ""
        }
        
    }

    componentDidMount()
    {
        axios.get("http://localhost:8080/api/currentuser").then((response)=>{
            console.log(response.data);
            this.setState({name : response.data.Name , emailID: response.data.Email})
        })

        
    }

    render(){
        return(
            <div>
            "Authentication Completed, User EMAIL is : {this.state.emailID}"
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