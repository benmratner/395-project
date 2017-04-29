import React from 'react';
import {Link} from 'react-router-dom'

const NavBar = (props) => {
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

                </ul>
            </div>
        </nav>
    )
}

export default NavBar;