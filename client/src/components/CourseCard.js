import React from "react"
import "../stylesheets/CourseCard.css"
import {Link} from "react-router-dom"

function EditorButton(){
    return (
        <div className = "courseButton"><Link to = "/editor" class = "removeDec">Add Content</Link></div>
    )
}

class CourseCard extends React.Component
{
    constructor(props)
    {
        super(props)
    }
    
    render()
    {   
        return(
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
                    <div className = "courseButton"><Link to = "/classroom" class = "removeDec">View Content</Link></div>
                    {this.props.user!="student"?(<EditorButton></EditorButton>):""}
                </div>
            </div>
        )
    }
}

export default CourseCard