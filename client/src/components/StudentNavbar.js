import React from "react"
import "../images/bits-logo.png"
import doctrinaLogo from "../images/doctrina-logo.png"
import profilePic from "../images/profilepic.png"
import {Link} from "react-router-dom"
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
        const styles = {
            color:"#DA1C3E"
        }
        return(
            <nav class="navbar is-black">
            <div className="navbar-brand">
                <Link class="navbar-item" to="/instructor_dashboard">
                <img src={doctrinaLogo} alt="Bulma: a modern CSS framework based on Flexbox" width="100" height="90"/>
                </Link>
                <div className="navbar-burger" data-target="navbarExampleTransparentExample">
                <span></span>
                <span></span>
                <span></span>
                </div>
            </div>

            <div id="navbarExampleTransparentExample" class="navbar-menu">
                <div className="navbar-start">
                <a class="navbar-item" href="/instructor_dashboard" style = {styles}>
                    Home
                </a>
                <div className="navbar-item has-dropdown is-hoverable " >
                    <a class="navbar-link" href="https://bulma.io/documentation/overview/start/" style = {styles}>
                    More
                    </a>
                    <div className="navbar-dropdown is-boxed is-black navbarColors">
                    <a class="navbar-item" href="https://bulma.io/documentation/overview/start/" style = {styles}>
                        Invites
                    </a>
                    <a class="navbar-item" href="https://bulma.io/documentation/overview/modifiers/" style = {styles}>
                        Reminders
                    </a>
                    <a class="navbar-item" href="https://bulma.io/documentation/columns/basics/" style = {styles}>
                        Queries
                    </a>
                    <a class="navbar-item" href="https://bulma.io/documentation/layout/container/" style = {styles}>
                        Layout
                    </a>
                    <a class="navbar-item" href="https://bulma.io/documentation/form/general/" style = {styles}>
                        Form
                    </a>
                    <hr class="navbar-divider" style = {styles}/>
                    <a class="navbar-item" href="https://bulma.io/documentation/elements/box/" style = {styles}>
                        Elements
                    </a>
                    <a class="navbar-item" href="https://bulma.io/documentation/components/breadcrumb/" style = {styles}>
                        Components
                    </a>
                    </div>
                </div>
                </div>

                <div className="navbar-end">
                <a class="navbar-item" href="https://bulma.io">
                <img src={profilePic} alt="Bulma: a modern CSS framework based on Flexbox" width="30" height="90"/>
                </a>
                <div className="navbar-item">
                    <b>{this.props.signedInUser}</b>    
                </div>
                &nbsp; &nbsp; &nbsp;
                <div className="navbar-item">
                    <div className="field is-grouped">
                    <p class="control">
                    <button class="button is-danger is-rounded signOut" onClick = {this.studentLogout}>Sign Out</button>
                    </p>
                    </div>
                </div>
                
                </div>
            </div>
            </nav>
        )
    }
}
export default StudentNavbar