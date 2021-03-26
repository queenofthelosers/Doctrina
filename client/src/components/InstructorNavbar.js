import React from "react"
import "../images/bits-logo.png"
import doctrinaLogo from "../images/doctrina-logo.png"
import profilePic from "../images/profilepic.png"
//import "../stylesheets/InstructorDash.css"
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
        const styles = {
            color:"#DA1C3E"
        }
        return(
            <nav class="navbar is-black">
            <div class="navbar-brand">
                <a class="navbar-item" href="https://bulma.io">
                <img src={doctrinaLogo} alt="Bulma: a modern CSS framework based on Flexbox" width="100" height="90"/>
                </a>
                <div class="navbar-burger" data-target="navbarExampleTransparentExample">
                <span></span>
                <span></span>
                <span></span>
                </div>
            </div>

            <div id="navbarExampleTransparentExample" class="navbar-menu">
                <div class="navbar-start">
                <a class="navbar-item" href="https://bulma.io/" style = {styles}>
                    Home
                </a>
                <div class="navbar-item has-dropdown is-hoverable " >
                    <a class="navbar-link" href="https://bulma.io/documentation/overview/start/" style = {styles}>
                    Docs
                    </a>
                    <div class="navbar-dropdown is-boxed is-black navbarColors">
                    <a class="navbar-item" href="https://bulma.io/documentation/overview/start/" style = {styles}>
                        Overview
                    </a>
                    <a class="navbar-item" href="https://bulma.io/documentation/overview/modifiers/" style = {styles}>
                        Modifiers
                    </a>
                    <a class="navbar-item" href="https://bulma.io/documentation/columns/basics/" style = {styles}>
                        Columns
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

                <div class="navbar-end">
                <a class="navbar-item" href="https://bulma.io">
                <img src={profilePic} alt="Bulma: a modern CSS framework based on Flexbox" width="30" height="90"/>
                </a>
                <div class="navbar-item">
                    <b>{this.props.signedInUser}</b>    
                </div>
                &nbsp; &nbsp; &nbsp;
                <div class="navbar-item">
                    <div class="field is-grouped">
                    <p class="control">
                    <button class="button is-danger is-rounded signOut" onClick = {this.instructorLogout}>Sign Out</button>
                    </p>
                    </div>
                </div>
                
                </div>
            </div>
            </nav>
            
        )
    }
}
export default InstructorNavbar