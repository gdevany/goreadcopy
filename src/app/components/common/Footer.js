import React, { PureComponent } from 'react'
import { ExternalRoutes as routes } from '../../constants'
import AuthedRedirect from './AuthedRedirect'
import SignUpModal from './SignUpModal'

const styles = {
  columnUl: {
    fontSize: 14,
    listStyle: 'none',
  },

  footerContainer: {
    padding: '50px 0',
  },
}

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
              <AuthedRedirect.Link
                href={authors()}
              >
                Authors
              </AuthedRedirect.Link>
            </li>
            <li>
              <AuthedRedirect.Link
                href={publishers()}
              >
                Publishers
              </AuthedRedirect.Link>
            </li>
            <li>
              <AuthedRedirect.Link
                href={advertisers()}
              >
                Advertisers
              </AuthedRedirect.Link>
            </li>
            <li>
              <AuthedRedirect.Link
                href={media()}
              >
                Media
              </AuthedRedirect.Link>
            </li>
            <li>
              <AuthedRedirect.Link
                href={childrensLiteracy()}
              >
                Children's Literacy
              </AuthedRedirect.Link>
            </li>
            <li>
              <AuthedRedirect.Link
                href={litcoins()}
              >
                Litcoins
              </AuthedRedirect.Link>
            </li>
          </ul>
        </div>

        <div className='small-12 medium-3 medium-offset-1 columns'>
          <ul style={styles.columnUl}>
            <li>
              <AuthedRedirect.Link
                href={support()}
              >
                Support
              </AuthedRedirect.Link>
            </li>
            <li>
              <AuthedRedirect.Link
                href={privacy()}
              >
                Privacy
              </AuthedRedirect.Link>
            </li>
            <li>
              <AuthedRedirect.Link
                href={terms()}
              >
                Terms
              </AuthedRedirect.Link>
            </li>
            <li>
              <a href='/antispam'>Antispam</a>
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
