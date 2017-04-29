import React, { PropTypes } from 'react'
import './songBox.scss'

class SongBox extends React.Component {
    constructor(props) {
        super(props);
    }

    handleBoxClick(){
        this.props.onClick(this.props.id);
    }
    
    render() {

        const isSelected = this.props.selected ? 'selected' : 'not-selected'
        return (
            <tr className={`${isSelected} song-row`} onClick={this.handleBoxClick.bind(this)}>
                <td className={`song-cell song-cell-title`}>{this.props.title}</td><td className={'song-cell cong-cell-artist'}>{this.props.artist}</td>
            </tr>
        )
    }
}

export default SongBox