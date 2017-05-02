import React from 'react';
import { Route, Switch, Link } from 'react-router-dom'
import firebase from 'firebase'
import fb from 'config/firebase'
import 'styles/global.scss'
import { HomeContainer, PlaylistCreateContainer, ChooseWaveformContainer, UploadContainer, AccountContainer } from 'containers';

import {NavBar} from 'components'

class MainContainer extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'MainContainer';

        this.state = {
            user: {}
        }

        firebase.auth().onAuthStateChanged(authData=>{
            this.setState({user: authData})
        })
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        let user= null;
        

        return (
            <div>
                <NavBar user={this.state.user}/>
            <Switch>
                <Route exact path='/' component={HomeContainer} />
                <Route path='/newplaylist' component={PlaylistCreateContainer} />
                <Route path='/choosewaveform' component={ChooseWaveformContainer} />
                <Route path='/Upload' component={UploadContainer} />
                <Route path='/playlists' component={AccountContainer} />



            </Switch>
                
                
            </div>
        )
    }
}

export default MainContainer;
