import React from "react"
import CourseCard from "./CourseCard"
import axios from "axios"
import StudentNavbar from "./StudentNavbar"
class StudentDashboard extends React.Component{
    
    constructor(props)
    {
        super(props);
        this.state = {
            name : "",
            emailID : ""
        }
        this.logOut = this.logOut.bind(this);
    }

    componentDidMount()
    {
        axios.get("http://localhost:8080/api/currentuser").then((response)=>{
            console.log(response.data);
            this.setState({name : response.data.name , emailID: response.data.email})
        })
    }

    logOut(){
        window.localStorage.removeItem('token');
        window.location.href = "/"
    }

    render(){
        return(
            <div>
            <StudentNavbar></StudentNavbar>
            "Authentication Completed, User EMAIL is : {this.state.emailID}"
            <div>
                <center><b><h1>MY COURSES</h1></b><button>+</button></center>
                
            </div>
            <button onClick = {this.logOut}>LOG OUT</button>
            <div className = "courseContainer">
                <CourseCard/>
                <CourseCard/>
            </div>
            
            </div>
        )
       
    }


}

export default StudentDashboard;