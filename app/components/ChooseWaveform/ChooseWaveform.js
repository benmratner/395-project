import React, { PropTypes } from 'react'

class ChooseWaveform extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="waveforms">
                <Waveform 
                    onClick={this.props.onGraphClick}
                    type={'Parabola'}
                />
                <Waveform 
                    onClick={this.props.onGraphClick}
                    type={'Sine'}
                />
            </div>
                
        )
    }
}



class Waveform extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick(){
        this.props.onClick(this.props.type)
    }
    
    render() {
        return (
            <div onClick={this.handleClick.bind(this)}>{this.props.type}</div>
        )
    }
}

export default ChooseWaveform