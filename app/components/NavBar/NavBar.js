import React from 'react';
import {Link} from 'react-router-dom'
import firebase from 'firebase'
import {AuthContainer} from 'containers'
import './nav.scss'

class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    handleLogOut(){
        firebase.auth().signOut()
    }
    
    render() {
        let userInfo;
        if (this.props.user){
            userInfo = (
                <div>
                    <li>
                        <Link to="/playlists">My Playlists</Link>
                    </li>
                    <li>
                    <Link to='/account'>
                    <img src={this.props.user.photoURL} className={'user-photo'}/>
                    {this.props.user.email}
                    </Link>
                    </li>
                    <li><div onClick={this.handleLogOut.bind(this)}>Log Out </div></li>
                </div>

            )
        } else {
            userInfo = <AuthContainer onSignIn={this.props.onSignIn} />
        }

        return (
            <nav className={"navbar navbar-default"}>
                <div className={"navbar-header"}>        
                    <a className="navbar-brand" href="/">Harmonizr</a>
                </div>
                <div className="collapse navbar-collapse">
                    <ul className={"nav navbar-nav"}>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/newplaylist'>New Playlist</Link></li>
                        <li><Link to='/upload'>Upload Song</Link></li>
                        {userInfo}

                    </ul>
                </div>
            </nav>
        )
    }
    
}

export default NavBar