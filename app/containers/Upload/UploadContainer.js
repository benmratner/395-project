import React, { PropTypes } from 'react'
import {FileUpload} from 'components'

class UploadContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    
    handleFile(file, infoObj) {
        this.setState({
            file,
            infoObj
        })
    }

    render() {
        return (
            <div>
                <FileUpload onFile={this.handleFile.bind(this)}/>
            </div>
        )
    }
}

export default UploadContainer