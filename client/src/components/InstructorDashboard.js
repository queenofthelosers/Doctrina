import React from "react"

class InstructorDashboard extends React.Component
{
    constructor(props){
        super(props);
        this.state = {

        }
        this.logOut = this.logOut.bind(this);
    }

    logOut()
    {
        window.localStorage.removeItem("instructor");
        window.location.href = "/"
    }

    render(){
        return(
            <div>
            <button onClick = {this.logOut}>Logout</button>
            Welcome {window.localStorage.getItem("instructor")}
            </div>
        )
    }
}

export default InstructorDashboard