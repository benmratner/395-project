import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import {isEmpty} from 'lodash'
import {SongBox} from 'components'

import './search.scss'

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    handleSongClick(id){
        this.props.onSongSelect(id);
    }

    handleUploadRowClick(){
        this.setState({redirect: true})
    }

    render() {

        if (this.state.redirect){
            return <Redirect to="/upload" />
        }

        let searchResults = null;
        if(this.props.displayResults){
            if (!isEmpty(this.props.searchResults)) {
                    searchResults = this.props.searchResults.map(searchedSong => {
                        let selected = this.props.selectedSongs.some(selectedSong => {
                            return selectedSong.title === searchedSong.title
                        })
                        return (
                            <SongBox 
                                key={searchedSong.id}
                                id={searchedSong.id}
                                title={searchedSong.title}
                                artist={searchedSong.artist} 
                                onClick={this.handleSongClick.bind(this)}
                                selected={selected}
                            />
                        )
                    })
                } else {
                    searchResults = (
                        <tr className={'gen-row'}>
                            <td className={'gen-cell'}>No Results :(</td>
                        </tr>
                    )
                }
        }
        return (
            <div>
                <div className={'searchtext'}>
                Search
                </div>
                <div className={'col-sm-8 col-sm-offset-2'}>

                <input 
                    onChange={this.props.onChange}
                    value={this.props.value}
                    className={'searchbox'}
                />
                    <table className={'search-results'}>
                        <tbody>
                        {searchResults}
                        
                        </tbody>
                        <tfoot>
                            <tr className={'gen-row'} onClick={this.handleUploadRowClick.bind(this)}>
                                <td colSpan="2" className={'gen-cell'}>Don't See the Song You Want? Upload a New Song!</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        )
    }
}

export default Search
