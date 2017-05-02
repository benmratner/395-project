import React from 'react'

class AccountContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <div className={'account-title'}>
                    <h1>My Playlists</h1>
                </div>
            </div>
        )
    }
}

export default AccountContainer