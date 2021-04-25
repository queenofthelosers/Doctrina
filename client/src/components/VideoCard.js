import React from "react"
import {Link} from "react-router-dom"
import "../stylesheets/StudentDash.css"

class VideoCard extends React.Component{
    constructor(props)
    {
        super(props)
    }
    render()
    {
        return(    
            <div className="vidCard">
                {this.props.lectureName}
               <Link to={{
                   pathname:"/video",
                   state:{
                       url:`http://localhost:8080/videos/${this.props.lectureName}/hls_master_for_test.m3u8`
                   }
               }}>
               
               
                <button class="button" style={{float:"right", borderRadius:"100%"}}>
                <span class="icon is-small">
                <i class="fa fa-play"></i>
                </span>
                </button>
               </Link>
            </div>
        )
    }
}

export default VideoCard