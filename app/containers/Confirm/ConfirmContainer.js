import React from 'react'
import {SongBox} from 'components'

class ConfirmContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    handleGoBackClick(){
        this.props.onGoBackClick();
    }

    handleConfirmClick(){
        this.props.onConfirmClick();
    }
    
    
    render() {
        return (
            <div>
            Use the following songs:
            {this.props.selectedSongs.map(song=>{
                return <SongBox 
                        key={song.id}
                        id={song.id}
                        title={song.title}
                        artist={song.artist} 
                    />
            })}
            With the following Waveform:
            {this.props.waveformType}
            <button onClick={this.handleConfirmClick.bind(this)}>Confirm</button>
            <button onClick={this.handleGoBackClick.bind(this)}>Go Back</button>

            </div>
        )
    }
}

export default ConfirmContainer