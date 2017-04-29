import React from 'react';
import { Route, Switch, Link } from 'react-router-dom'
import 'styles/global.scss'
import { HomeContainer, PlaylistCreateContainer, ChooseWaveformContainer, UploadContainer } from 'containers';
import {NavBar} from 'components'

class MainContainer extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'MainContainer';
    }

    render() {
        return (
            <div>
                <NavBar />
            <Switch>
                <Route exact path='/' component={HomeContainer} />
                <Route path='/newplaylist' component={PlaylistCreateContainer} />
                <Route path='/choosewaveform' component={ChooseWaveformContainer} />
                <Route path='/Upload' component={UploadContainer} />


            </Switch>
                
                
            </div>
        )
    }
}

export default MainContainer;
