import React from "react";
import ReactHlsPlayer from 'react-hls-player';
import ReactHLS from 'react-hls';
class VideoPlayer extends React.Component{

    constructor(props){
        super(props);
    }

    render()
    {
        return(
            <ReactHLS url={"http://localhost:8080/videos/merged/hls_master_for_test.m3u8"} />
        )
    }

}

export default VideoPlayer