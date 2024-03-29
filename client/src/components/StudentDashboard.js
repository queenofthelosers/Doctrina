import React from "react"
import CourseCard from "./CourseCard"
import axios from "axios"
import StudentNavbar from "./StudentNavbar"
import "../stylesheets/StudentDash.css"
class StudentDashboard extends React.Component{
    
    constructor(props)
    {
        super(props);
        this.state = {
            name : "",
            emailID : "",
            lectureList:[]
        }
        
    }

    componentDidMount()
    {
        axios.get("http://127.0.0.1:8080/api/currentuser").then((response)=>{
            console.log(response.data);
            this.setState({name : response.data.name , emailID: response.data.email})
        })
        
        
    }


    render(){
        return(
            <div>
            <StudentNavbar signedInUser = {this.state.name}></StudentNavbar>
            {/* <h1><b>Welcome, {this.state.name}</b></h1> */}
            <div className = "courseContainer">
                <center><b>Your Courses</b></center>
                <br/>
                <CourseCard user = "student"/>
            </div>
            </div>
        )
       
    }


}

export default StudentDashboard;