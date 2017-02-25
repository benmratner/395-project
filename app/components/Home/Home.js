import React from 'react';
import {Link} from 'react-router';
import ReactAudioPlayer from 'react-audio-player'
import {FileUpload} from 'components'
import img from 'img/maxresdefault.jpg'
import audio from 'audio/Sleepyhead.mp3'
import axios from 'axios'

class Home extends React.Component {
    constructor(props) {
    	super(props);
    	this.displayName = "Home";
        this.state = {
          data_uri: null,
          processing: false
        }

    }
    handleFile(file, infoObj){
        this.setState({
            file,
            infoObj
        })
    }

	render (){
		return (
            <div>
				<h1>Home Component</h1>
                <ReactAudioPlayer
                    src={audio}
                />
                <FileUpload onFile={this.handleFile.bind(this)}/>
            </div>
			)
	}
}

export default Home
