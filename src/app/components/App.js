import React, { PureComponent } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Theme from '../../client/theme/Theme'

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
		return(
			<div className='app'>
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
  muiTheme: React.PropTypes.object.isRequired,
}

export default App;
