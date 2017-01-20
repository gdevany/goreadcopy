import React, { PureComponent, PropTypes } from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import '../../client/styles/styles.scss'

export class App extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  static childContextTypes = {
    muiTheme: PropTypes.object,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    }
  }

  componentWillMount() {
    this.setState({
      muiTheme: getMuiTheme()
    })
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme

    this.setState({
      muiTheme: newMuiTheme
    })
  }

  render() {

    return (
      <div className="app">
      <h1> APP WORKS!!!</h1>
      {
        React.cloneElement(this.props.children, {
          onChangeMuiTheme: this.handleChangeMuiTheme
        })
      }
      </div>
    )
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
}

export default App
