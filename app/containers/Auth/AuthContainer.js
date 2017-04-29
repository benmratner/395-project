import React from 'react'
import firebaseui from 'firebaseui'
import firebase from 'firebase'
import fb from 'config/firebase'

// var app = firebase.initializeApp(config);
var authUi = new firebaseui.auth.AuthUI(firebase.auth());

class AuthContainer extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
    var uiConfig = {
      'callbacks': {
        'signInSuccess': (user)=> {
          if (this.props.onSignIn) {
            this.props.onSignIn(user);
          }
          return false;
        }
      },
      'signInOptions': [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ]
    };
    authUi.start('#firebaseui-auth', uiConfig);
  }
  componentWillUnmount() {
      authUi.reset()
  }
    
    render() {
        return (
            <div id="firebaseui-auth"></div>
        )
    }
}

export default AuthContainer