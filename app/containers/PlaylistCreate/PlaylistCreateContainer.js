import React from 'react'
import {Link} from 'react-router-dom'
import {values} from 'lodash'
import {SearchContainer, ChooseWaveformContainer, ConfirmContainer, PlaylistContainer} from 'containers'
import parabola from 'sorters/Parabola'
import {fb as firebase} from 'config/firebase'

class PlaylistCreateContainer extends React.Component {
    constructor(props) {
        super(props);
        console.log(Date.now())

        console.log('constructor2')
        this.state = {
            allSongs: [],
            selectedSongs: [],
            pageState: 'search',
            waveformType: '',
            canAdvance: false,
        }

    }
    componentWillMount() {
        this.fb = firebase.database;

        this.pullFromDB();
    }

    pullFromDB(){
        let songsObj = {}
        this.fb.ref('songs').orderByChild('title').once('value', snapshot => {
            songsObj = snapshot.val();
            let songsArr = []
            songsArr = values(songsObj)
            this.setState({ allSongs: songsArr })
        })

    }

    handleSongSelect(songId){

        let selectedSong = this.state.allSongs.find(el =>{
            return el.id === songId
        })
        let arr = this.state.selectedSongs;
        let includes = arr.some(el =>{
            return el.id === songId
        })
        if (includes) {
            arr = arr.filter(el =>{
                return el.id !== songId
            })
        } else {
            arr.push(selectedSong)
        }

        let canAdvance = arr.length > 2
        
        this.setState({selectedSongs: arr, canAdvance})

    }

    handleWaveformSelect(waveformType){
        if (this.state.waveformType === waveformType){
            this.setState({waveformType: '', canAdvance: false})

        } else {
            this.setState({waveformType, canAdvance: true})
        }
    }

    makePlaylist(){
        let sorted = parabola(this.state.selectedSongs);
        this.setState({playlist: sorted});
        this.changePageState();
    }

    resetPage(){
        this.setState({pageState: 'search', canAdvance: false})

    }

    changePageState(){
        switch (this.state.pageState){
            case 'search':
                this.setState({pageState: 'waveforms', canAdvance: false})
                break;
            case 'waveforms':
                this.setState({pageState: 'confirm', canAdvance: false})
                break;
            case 'confirm':
                this.setState({pageState: 'playlist', canAdvance: false})

        } 
    }

    getPageState(){
        let pageView = null;
        switch (this.state.pageState){
            case 'search':
                return (<SearchContainer 
                            allSongs = {this.state.allSongs}
                            onSongSelect={this.handleSongSelect.bind(this)}
                            selectedSongs={this.state.selectedSongs}
                        />)
                break;
            case 'waveforms':
                return (<ChooseWaveformContainer 
                            onWaveformSelect={this.handleWaveformSelect.bind(this)}
                        />)
                break;

            case 'confirm':
                return (<ConfirmContainer 
                            selectedSongs={this.state.selectedSongs}
                            waveformType={this.state.waveformType}
                            onConfirmClick={this.makePlaylist.bind(this)}
                            onGoBackClick={this.resetPage.bind(this)}

                        />)
                break;
            case 'playlist':
                return (<PlaylistContainer 
                            playlist={this.state.playlist}

                        />)

        }

    }

    render() {
        let nextBox = this.state.canAdvance ?
        <div 
            className={" col-sm-2 nextbox"}
            onClick={this.changePageState.bind(this)}
        >
            Next
        </div>
        :
        null

        const pageView = this.getPageState()


        return (
            <div>
                {pageView}
                {nextBox}
            </div>
        )
    }
}

export default PlaylistCreateContainer