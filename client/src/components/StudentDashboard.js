import React from "react"
import CourseCard from "./CourseCard"
import axios from "axios"

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
            this.setState({name : response.data.Name , emailID: response.data.Email})
        })
    }

    logOut(){
        window.localStorage.removeItem('token');
        window.location.href = "/"
    }

    render(){
        return(
            <div>
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