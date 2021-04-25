import React from "react";
import ReactHlsPlayer from 'react-hls-player';
class VideoPlayer extends React.Component{

    constructor(props){
        super(props);
    }
   
    render()
    {
        console.log(this.props.location.state.url)
        return(
            // <ReactHLS url={"http://localhost:8080/videos/merged/hls_master_for_test.m3u8"} />
            <center>
            <ReactHlsPlayer
            src={this.props.location.state.url}
            autoPlay={false}
            controls={true}
            width="85%"
            height="auto"
          />
          </center>
        )
    }

}

export default VideoPlayer