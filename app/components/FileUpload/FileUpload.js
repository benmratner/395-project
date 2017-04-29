import React, { Component } from 'react';
import { bindAll } from 'lodash';
import axios from 'axios'
import io from 'socket.io-client'

class FileUpload extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data_uri: null,
            processing_state: false
        }

        let socket;

        bindAll(this, 'handleFile', 'handleSubmit');
    }

    componentWillMount() {

    }

    updateStatus(newStatus) {
        this.setState({ processing_state: newStatus })
    }

    updateConnected(newStatus) {
        this.setState({ connected: newStatus })
    }

    connectToSocket(roomName) {
        const socket = io.connect("http://localhost:3000")

        socket.on('status', (payload) => {
            console.log(payload)
            this.updateStatus(payload)
        })
        socket.on('connected', (payload) => {
            this.updateConnected(payload)
        })

        socket.emit('room', { room: roomName })

        return socket;

    }

    disconnectFromSocket(socket){
        socket.disconnect();
    }


    handleSubmit(e) {
        e.preventDefault();
        const socket = this.connectToSocket(this.state.filename);
        this.setState({ processing_state: "upload" })

        const promise = axios({
            url: '/music',
            method: "POST",
            data: {
                data_uri: this.state.data_uri,
                filename: this.state.filename,
                filetype: this.state.filetype
            },
            dataType: 'json'
        });

        promise.then(data => {
            console.log(data)
            this.setState({
                processing_state: false,
                uploaded_uri: data.uri,
                processed_data: data.data,
            });
        });

        this.disconnectFromSocket(socket);
    }

    handleFile(e) {

        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onload = (upload) => {
            this.setState({
                data_uri: upload.target.result,
                filename: file.name,
                filetype: file.type
            });
        };

        reader.readAsBinaryString(file);
    }

    render() {
        let processing;
        let uploaded;

        if (this.state.processed_data) {
            uploaded = (
                <div>
          <h4>File Processed!</h4>
          <p>Title: {this.state.processed_data.meta.tags.title}</p>
        </div>
            );
        }

        switch (this.state.processing_state) {
            case "upload":
                processing = "Uploading Audio File..."
                break;
            case "analyze":
                processing = "Analyzing Audio File..."
                break;
            case "parse":
                processing = "Parsing Audio Data..."
                break;
            case "save":
                processing = "Saving Audio Data to Database..."
                break;
            case "finish":
                processing = "Done Analyzing!"
                break;
            default:
                processing = ""

        }

        return (
            <div className='row'>
        <div className='col-sm-12'>
          <label>Upload a File</label>
          <form onSubmit={this.handleSubmit.bind(this)} encType="multipart/form-data">
            <input type="file" onChange={this.handleFile} />
            <input  className='btn btn-primary' type="submit" value="Upload" />
            {processing}
          </form>
          {uploaded}
        </div>
      </div>
        );
    }
}

export default FileUpload;
