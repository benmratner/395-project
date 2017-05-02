import React from 'react'
import {SongBox} from 'components'
class PlaylistContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showNameBox: false,
            playlistName: '',
        }
    }

    handlePlaylistNameChange(e){
        this.setState({playlistName: e.target.value})
    }

    handleSaveButtonClick(){
        this.setState({showNameBox: true})
    }
    
    render() {
        const playlist = this.props.playlist.map(song => {
            return (
                    <SongBox 
                        key={song.id}
                        id={song.id}
                        title={song.title}
                        artist={song.artist} 
                    />
                )
        })
        const save = this.state.showNameBox ?
        <div>
        <input
            onChange={this.handlePlaylistNameChange.bind(this)}
            value={this.state.playlistName}
        />
        <button onClick={this.handleSaveButtonClick.bind(this)}> Save </button>
        </div>
        :
        <button onClick={this.handleSaveButtonClick.bind(this)}> Save to My Playlists </button>

        return (
            <div>
                {playlist}
                {save}
            </div>
        )
    }
}

export default PlaylistContainer