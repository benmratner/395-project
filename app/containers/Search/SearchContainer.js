import React, { PropTypes } from 'react'
import {pickBy, startsWith} from 'lodash'
import Search from 'components/Search/Search'

class SearchContainer extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            searchBox: '',
            searchResults: [],
            selectedSongs: [],
        }
    }

    

    filterSongs(searchTerm){

        let filter = this.props.allSongs.filter((song)=> {
            return (song.title.toUpperCase().match(searchTerm.toUpperCase()) || song.artist.toUpperCase().match(searchTerm.toUpperCase()))
        })

        return filter;
    }

    handleSearchInput(e){
        this.setState({
            searchBox: e.target.value,
            searchResults: this.filterSongs(e.target.value)
        })        

    }

    handleSongSelect(songId){

        this.props.onSongSelect(songId);

    }

    
    render() {
        return (
            <div>
                <Search
                    value={this.state.searchBox}
                    onChange={this.handleSearchInput.bind(this)}
                    onSongSelect={this.handleSongSelect.bind(this)}
                    searchResults={this.state.searchResults}
                    selectedSongs={this.props.selectedSongs}
                    displayResults={!!this.state.searchBox.length}
                />
            </div>
        )
    }
}

export default SearchContainer