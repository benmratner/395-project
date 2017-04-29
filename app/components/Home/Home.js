import React from 'react';
import { FileUpload } from 'components'
import {AuthContainer} from 'containers'
import { parabola } from 'sorters'
import axios from 'axios'

import './home.scss'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = "Home";
        this.state = {
            user: {}
        }

    }

    handleSignIn(user){
        this.setState({user})
    }

    render() {
        return (
            <div className={'col-sm-6 col-sm-offset-3 main'}>
                <h1>Harmonizr</h1>
                <h3>Intentionally Ordered Playlists.</h3>
                <h4>Because you're better than just hitting "Shuffle"</h4>
            </div>
        )
    }
}

export default Home
