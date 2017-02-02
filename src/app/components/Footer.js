import React, { PureComponent } from 'react'
import routes from '../services/currentEnvRoutes'
import SignUpModal from './SignUpModal'

const styles = {
  columnUl: {
    fontSize: 14,
    listStyle: 'none',
  },

  footerContainer: {
    padding: '50px 0',
  },
};


class Footer extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      modalOpen: false
    }

    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen = (event) => {
    this.setState({ modalOpen: true })
  }

  handleClose = () => {
    this.setState({ modalOpen: false })
  }

  render() {
    const {
      support,
      privacy,
      terms,
      authors,
      publishers,
      advertisers,
      media,
      childrensLiteracy,
      litcoins
    } = routes

    return (
      <div className='row footer-links' style={styles.footerContainer}>

        <div className='small-12 medium-3 medium-offset-1 columns'>
          <ul style={styles.columnUl}>

            <li>
              <a href='#'> Log in </a>
              {/** TODO: Need to link this to modal after modal merge**/}
            </li>
            <li>
              <a onClick={this.handleOpen}> Sign up </a>
            </li>
          </ul>
        </div>

        <div className='small-12 medium-3 medium-offset-1 columns'>
          <ul style={styles.columnUl}>

            <li>
              <a href={authors()}> Authors </a>
            </li>
            <li>
              <a href={publishers()}> Publishers </a>
            </li>
            <li>
              <a href={advertisers()}> Advertisers </a>
            </li>
            <li>
              <a href={media()}> Media </a>
            </li>
            <li>
              <a href={childrensLiteracy()}> {'Children\'s Literacy'} </a>
            </li>
            <li>
              <a href={litcoins()}> Litcoins </a>
            </li>

          </ul>
        </div>

        <div className='small-12 medium-3 medium-offset-1 columns'>
          <ul style={styles.columnUl}>

            <li>
              <a href={support()}> Support </a>
            </li>
            <li>
              <a href={privacy()}> Privacy </a>
            </li>
            <li>
              <a href={terms()}> Terms </a>
            </li>

          </ul>
        </div>

        <SignUpModal
          modalOpen={this.state.modalOpen}
          handleClose={this.handleClose}
        />
      </div>
    )
  }
}

export default Footer
