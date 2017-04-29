import React from 'react'
import {Home}  from 'components'


class HomeContainer extends React.Component{
  render () {
    return (
      <div>
          <Home onSignIn={this.props.onSignIn}/>

      </div>

    )
  }
}
export default HomeContainer