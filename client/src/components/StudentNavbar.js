import React from "react"
import "../images/bits-logo.png"
class StudentNavbar extends React.Component{
    constructor(props){
        super(props);
        this.studentLogout = this.studentLogout.bind(this);
    }
    studentLogout(){
        window.localStorage.removeItem('token');
        window.location.href = "/"
    }
    render()
    {
        return(
            <div>
            <nav class="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                {/* <a class="navbar-item" href="https://bulma.io">
                <img src="../images/bits-logo.png" width="250" height="250"/>
                </a> */}

                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu">
                <div className="navbar-start">
                <a class="navbar-item">
                    Profile
                </a>

                <a class="navbar-item">
                    My Courses
                </a>

                <div className="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">
                    More
                    </a>

                    <div className="navbar-dropdown">
                    <a class="navbar-item">
                        About
                    </a>
                    <a class="navbar-item">
                        Jobs
                    </a>
                    <a class="navbar-item">
                        Contact
                    </a>
                    <hr class="navbar-divider"/>
                    <a class="navbar-item">
                        Report an issue
                    </a>
                    </div>
                </div>
                </div>

                <div className="navbar-end">
                <div className="navbar-item">
                    <div className="buttons">
                    <a class="button is-danger" onClick = {this.studentLogout}>
                        <strong>Logout</strong>
                    </a>
                    
                    </div>
                </div>
                </div>
            </div>
            </nav>
            </div>
        )
    }
}
export default StudentNavbar