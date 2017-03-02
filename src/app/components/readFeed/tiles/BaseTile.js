import React, { Component } from 'react'

class BaseTile extends Component{
  render(){
    return (
      <div className='tile'>
        {this.props.children()}
      </div>
    )
  }
}

export default BaseTile
