import React, { PropTypes } from 'react'
import parabola from 'img/parabola.png'
import sine from 'img/sine.png'


class ChooseWaveform extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null
        }
    }

    handleWaveformSelect(waveformType){
        if (this.state.selected === waveformType){
            this.setState({selected: null})
        } else {
            this.setState({selected: waveformType})

        }
        this.props.onGraphClick(waveformType)
    }


    render() {
        return (
            <div className="waveforms">
                <Waveform 
                    onClick={this.handleWaveformSelect.bind(this)}
                    selected={this.state.selected}
                    image={parabola}
                    type={'parabola'}

                />
                <Waveform 
                    onClick={this.handleWaveformSelect.bind(this)}
                    selected={this.state.selected}
                    image={sine}
                    type={'sine'}


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
        let chosen = "not-chosen"
        if (this.props.selected === this.props.type){
            chosen = 'chosen'
        }
        const img = this.props.image
        return (
            <div className={'col-sm-3 col-sm-offset-2'}  onClick={this.handleClick.bind(this)}>
                <img className={chosen} src={this.props.image} alt=""/>
            </div>
        )
    }
}

export default ChooseWaveform