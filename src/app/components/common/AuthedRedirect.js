import React, { Component } from 'react'
import R from 'ramda'
import { Collections } from '../../services'

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
  componentDidMount = () => {
  // Performs sync post via form submission; will redirect to this.props.url
    if (this.props.shouldSubmit) { this.form.submit() }
  }

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
    } = this.props

    return (
      <TriggeredSubmit
        url={submitTo}
        params={params}
        shouldSubmit={this.state.shouldSubmit}
      >
        <a
          href={href}
          onClick={this.handleClick}
        >
        {this.props.children}
        </a>
      </TriggeredSubmit>
    )
  }
}

import { Auth } from '../../services'
import { Endpoints } from '../../constants'
const Link = ({ href, children }) => {
  return (
    <SubmitLink
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

const Button = ({ href, children, shouldSubmit }) => {
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

export default {
  AuthedRedirectLink,
  AuthedRedirectButton,
}
