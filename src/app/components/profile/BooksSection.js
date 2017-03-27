import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'material-ui/Tabs'
import { Colors } from '../../constants/style'
import { ProfilePage } from '../../redux/actions'

const { getCurrentlyReading, getLibrary } = ProfilePage

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  tab: {
    backgroundColor: Colors.white,
    color: Colors.black,
    borderBottom: `1px solid ${Colors.lightMedGrey}`,
    fontSize: 12,
    fontWeight: 200,
    textTransform: 'none',
  },
  tabContainer: {
    width: '100%',
    maxWidth: 800,
    margin: '0px auto 50px',
  },
  currentTab: {
    color: Colors.blue,
    borderBottom: `2px solid ${Colors.blue}`,
  },
}

class BooksSection extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      libraryFetched: false,
      userId: null,
    }
  }

  componentWillMount = () => {
    this.setState({
      libraryFetched: false
    })
  }

  componentWillReceiveProps = (nextProps) => {

    if (nextProps.id && nextProps.id !== this.state.userId && !this.state.libraryFetched) {
      this.props.getCurrentlyReading(nextProps.id)
      this.props.getLibrary(nextProps.id)
      this.setState({
        userId: nextProps.id,
        libraryFetched: true
      })
    }
  }

  renderLibrary = () => {
    const { profilePage } = this.props

    if (profilePage.myLibrary.count) {
      return (
        <div>Here is my library</div>
      )
    }
    return null
  }

  renderCurrentlyReading = () => {
    const { profilePage } = this.props

    if (profilePage.currentlyReading) {
      return (
        <div>Currently Reading</div>
      )
    }
    return null
  }

  render() {
    const { userId, libraryFetched } = this.state
    if (userId && libraryFetched) {
      return (
        <div className='sidebar-books-container box'>
          <Tabs
            style={styles.tabContainer}
            inkBarStyle={styles.currentTab}
          >
            <Tab
              label='Library'
              style={styles.tab}
            >
              <div className='sidebar-books-tab-container'>
                {this.renderLibrary()}
              </div>
            </Tab>
            <Tab
              label='Now Reading'
              style={styles.tab}
            >
              <div className='sidebar-books-tab-container'>
                {this.renderCurrentlyReading()}
              </div>
            </Tab>
          </Tabs>
        </div>
      )
    }
    return null
  }
}
const mapStateToProps = (state) => {
  return {
    profilePage: {
      currentlyReading: state.profilePage.currentlyReading,
      myLibrary: {
        count: state.profilePage.count,
        perPage: state.profilePage.perPage,
        page: state.profilePage.page,
        results: state.profilePage.results
      }
    }
  }
}
export default connect(mapStateToProps, { getCurrentlyReading, getLibrary })(BooksSection)
