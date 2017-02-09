import React, { Component } from 'react'
import R from 'ramda'
import { MenuItem as MUIMenuItem } from 'material-ui'
import { Auth, Collections } from '../../services'
import { Endpoints } from '../../constants'

const { assocList } = Collections

const toNameAndValue = ([name, value]) => {
  return {
    name,
    value
  }
}

const FormField = ({ name, value }) => (
  <input name={name} value={value} key={name} readOnly />
)

const styles = {
  form: {
    display: 'none',
  }
}

class TriggeredSubmit extends Component {
  constructor(props) {
    super(props)

    this.autoSubmit = this.autoSubmit.bind(this)
  }

  autoSubmit = (props) => {
    if (props.shouldSubmit) { this.form.submit() }
  }

  // Performs sync post via form submission; will redirect to this.props.url
  componentDidMount = () => this.autoSubmit(this.props)

  componentWillReceiveProps = (newProps) => this.autoSubmit(newProps)

  render() {
    const {
      url,
      method,
      params,
    } = this.props

    const fieldNamesAndValues = R.map(toNameAndValue, assocList(params))

    return (
      <div>
        <form
          style={styles.form}
          name={'autoSubmit'}
          id={'autoSubmit'}
          action={url}
          method={method}
          ref={(form) => { this.form = form }}
        >
        {R.map(FormField, fieldNamesAndValues)}
        </form>
        {this.props.children}
      </div>
    )
  }
}

TriggeredSubmit.defaultProps = {
  method: 'POST',
  shouldSubmit: false,
}

class SubmitLink extends Component {
  constructor(props) {
    super(props)

    this.state = {
      shouldSubmit: false,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = (e) => {
    e.preventDefault()
    this.setState({
      shouldSubmit: true,
    })
  }

  render() {
    const {
      href,
      submitTo,
      params,
      className,
    } = this.props

    if (!Auth.currentUserExists()) {
      return (<a className={className}href={href}>{this.props.children}</a>)
    }

    return (
      <TriggeredSubmit
        url={submitTo}
        params={params}
        shouldSubmit={this.state.shouldSubmit}
      >
        <a
          href={href}
          onClick={this.handleClick}
          className={className}
        >
        {this.props.children}
        </a>
      </TriggeredSubmit>
    )
  }
}

const Link = ({ href, children, className }) => {
  return (
    <SubmitLink
      className={className}
      submitTo={Endpoints.redirect()}
      href={href}
      params={{
        token: Auth.token(),
        redirectPath: href,
      }}
    >
    {children}
    </SubmitLink>
  )
}

const Button = ({ href, children }) => {
  return (
    <TriggeredSubmit
      shouldSubmit={shouldSubmit}
      url={Endpoints.redirect()}
      params={{
        token: Auth.token(),
        redirectPath: href,
      }}
    >
    {children}
    </TriggeredSubmit>
  )
}

class MenuItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      shouldSubmit: false,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = (e) => {
    e.preventDefault()
    this.setState({
      shouldSubmit: true,
    })
  }

  render() {
    const {
      href,
      children,
      ...others,
    } = this.props

    if (!Auth.currentUserExists()) {
      return (
        <MUIMenuItem
          href={href}
        >
          {children}
        </MUIMenuItem>
      )
    }

    return (
      <MUIMenuItem
        onClick={this.handleClick}
        {...others}
      >
        <TriggeredSubmit
          shouldSubmit={this.state.shouldSubmit}
          url={Endpoints.redirect()}
          params={{
            token: Auth.token(),
            redirectPath: href,
          }}
        >
          {children}
        </TriggeredSubmit>
      </MUIMenuItem>
    )
  }
}

export default {
  Link,
  Button,
  MenuItem,
}
