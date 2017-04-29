import React, { PropTypes } from 'react'
import {ChooseWaveform} from 'components'
class ChooseWaveformContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    handleGraphClick(type){
        this.props.onWaveformSelect(type);
    }
    
    render() {
        return (
            <div>
                <ChooseWaveform 
                    onGraphClick={this.handleGraphClick.bind(this)}
                />
            </div>
        )
    }
}

export default ChooseWaveformContainer