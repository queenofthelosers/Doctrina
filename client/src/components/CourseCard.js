import React from "react"
import "../stylesheets/CourseCard.css"
import {Link} from "react-router-dom"
class CourseCard extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        return(
            // <div className="courseCard">
            // <article class="panel is-link">
            // <p class="panel-heading">
            //     CS F111 Computer Programming
            // </p>
            
            // <div class="panel-block">
            //     <p class="control has-icons-left">
            //     <input class="input is-link" type="text" placeholder="Search"/>
            //     <span class="icon is-left">
            //         <i class="fas fa-search" aria-hidden="true"></i>
            //     </span>
            //     </p>
            // </div>
            // <a class="panel-block is-active">
            //     <span class="panel-icon">
            //     <i class="fas fa-book" aria-hidden="true"></i>
            //     </span>
            //     bulma
            // </a>
            // <a class="panel-block">
            //     <span class="panel-icon">
            //     <i class="fas fa-book" aria-hidden="true"></i>
            //     </span>
            //     marksheet
            // </a>
            // <a class="panel-block">
            //     <span class="panel-icon">
            //     <i class="fas fa-book" aria-hidden="true"></i>
            //     </span>
            //     minireset.css
            // </a>
            // <a class="panel-block">
            //     <span class="panel-icon">
            //     <i class="fas fa-book" aria-hidden="true"></i>
            //     </span>
            //     jgthms.github.io
            // </a>
            // <div><button className="button is-warning courseButton">View Course Content</button></div>
            // </article>
            // </div>
            <div className = "courseCard">
                <div className = "courseID">
                    <b>CS F111</b>
                    &nbsp;&nbsp;&nbsp;
                    <b>
                    Computer Programming
                    </b>
                </div>
                <div className = "courseDetails">
                    IC : Panda<br/>
                    Course Start : 26/03/21<br/>
                    Course End : 5/04/21
                    <br/>
                </div>
                <div className = "cardFooter">
                    <div className = "courseButton"><Link to = "/editor" className = "removeDec">Add Content</Link></div>
                    <div className = "courseButton">View Contents</div>
                </div>
            </div>
        )
    }
}

export default CourseCard