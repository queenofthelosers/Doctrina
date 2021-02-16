import React from "react"
import "../images/bits-logo.png"
class InstructorNavbar extends React.Component{
    constructor(props){
        super(props);
        this.studentLogout = this.instructorLogout.bind(this);
    }
    instructorLogout(){
        window.localStorage.removeItem('instructor');
        window.location.href = "/"
    }
    render()
    {
        return(
            <div>
            <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
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
                <div class="navbar-start">
                <a class="navbar-item">
                    Profile
                </a>

                <a class="navbar-item">
                    My Courses
                </a>
                <a class="navbar-item">
                    Invites
                </a>
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">
                    More
                    </a>

                    <div class="navbar-dropdown">
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

                <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                    <a class="button is-danger" onClick = {this.instructorLogout}>
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
export default InstructorNavbar