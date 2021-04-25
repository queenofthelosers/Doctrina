import React from "react"
import axios from "axios"
import StudentNavbar from "./StudentNavbar"
import VideoCard from "./VideoCard"
class Classroom extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            lectureList : [],
            name : "",
            emailID:""
        }
    }
    
    componentDidMount()
    {
        axios.get("http://127.0.0.1:8080/api/currentuser").then((response)=>{
            console.log(response.data);
            this.setState({name : response.data.name , emailID: response.data.email})
        })
        axios.get("http://127.0.0.1:8080/api/list_lectures").then((response)=>{
            console.log(response.data.file_array);
            this.setState({lectureList:response.data.file_array});
        })
    }

    render()
    {
       
        return(
            <div style={{color:"white"}}>
                <StudentNavbar signedInUser = {this.state.name}></StudentNavbar>
                <br/>
                <center><h1><b>Video Lectures</b></h1></center>
                {this.state.lectureList.map((lecture,index)=>(
                    <div>
                    <br/>
                    <VideoCard lectureName = {lecture} key = {index}></VideoCard>
                    <br/>
                    </div>
                ))}
            </div>
        )
    }
}

export default Classroom