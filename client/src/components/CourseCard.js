import React from "react"
import "../stylesheets/CourseCard.css"
class CourseCard extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        return(
            <div className="courseCard">
            <article class="panel is-link">
            <p class="panel-heading">
                CS F111 Computer Programming
            </p>
            {/* <p class="panel-tabs">
                <a class="is-active">All</a>
                <a>Public</a>
                <a>Private</a>
                <a>Sources</a>
                <a>Forks</a>
            </p> */}
            <div class="panel-block">
                <p class="control has-icons-left">
                <input class="input is-link" type="text" placeholder="Search"/>
                <span class="icon is-left">
                    <i class="fas fa-search" aria-hidden="true"></i>
                </span>
                </p>
            </div>
            <a class="panel-block is-active">
                <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true"></i>
                </span>
                bulma
            </a>
            <a class="panel-block">
                <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true"></i>
                </span>
                marksheet
            </a>
            <a class="panel-block">
                <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true"></i>
                </span>
                minireset.css
            </a>
            <a class="panel-block">
                <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true"></i>
                </span>
                jgthms.github.io
            </a>
            <div><button className="button is-warning courseButton">View Course Content</button></div>
            </article>
            </div>
        )
    }
}

export default CourseCard