import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { AvatarSummary } from '../common'
import { Dialog, Tabs, Tab } from 'material-ui'
import SwipeableViews from 'react-swipeable-views'
import { Follow } from '../../redux/actions'
import { Colors } from '../../constants/style'
import R from 'ramda'

const { updateFollowed, updateFollowers } = Follow

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },

  slide: {
    padding: 10,
  },

  modalBody: {
    marginTop: -80,
  },

  modalContent: {
    maxWidth: '100%',
    width: '100%',
    opacity: 0.93,
  },

  formContainer: {
    height: '100vh',
    margin: '0 auto',
    maxWidth: 400,
  },

  header: {
    color: Colors.black,
    marginBottom: 50,
  },

  tab: {
    backgroundColor: Colors.white,
    color: Colors.black,
    borderBottom: `1px solid ${Colors.lightMedGrey}`,
    fontSize: 18,
    fontWeight: 600,
    textTransform: 'none',
  },

  tabContainer: {
    maxWidth: 800,
    margin: '0px auto 50px',
  },

  currentTab: {
    color: Colors.blue,
    borderBottom: `2px solid ${Colors.blue}`,
  }
}

class FollowModal extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      followed: [],
      followers: [],
      slideIndex: 0,
    }

    this.handleChipClick = this.handleChipClick.bind(this)
    this.isChosen = this.isChosen.bind(this)
  }

  componentDidMount = () => {
    const { followed, followers } = this.props
    if (followed.count) {
      // TODO: map over followed prop and push user ids to following local state
    }

    if (followers.count) {
      // TODO: map over followers prop and push user ids to following local state
    }
  }

  componentDidUpdate = () => {
    const { followed, followers } = this.state
    const { updateFollowed, updateFollowers } = this.props
    if (followed.length) updateFollowed({ followed })
    if (followers.length) updateFollowers({ followers })
  }

  handleChipClick = (event, followType, id) => {
    event.preventDefault()
    const state = (followType === 'followers') ? this.state.followers : this.state.followed
    const stateKey = (followType === 'followers') ? 'followers' : 'followed'

    if (this.isChosen(id, followType)) {
      const collectionWithoutMember = R.reject(R.equals(id), state)
      this.setState({ [stateKey]: [...collectionWithoutMember] })
    } else {
      this.setState({ [stateKey]: [...state, id] })
    }
  }

  isChosen = (id, followType) => {
    return (followType === 'followers') ?
      R.contains(id, this.state.followers) :
      R.contains(id, this.state.followed)
  }

  renderUsers = (followType, users) => {
    return users.map((user, index) => {
      const {
        id,
        firstName,
        lastName,
        image,
      } = user

      const name = `${firstName} ${lastName}`

      return (
        <div className='column column-block' key={id}>
          <AvatarSummary
            id={id}
            key={id}
            title={name}
            image={image}
            followType={followType}
            isChosen={this.isChosen}
            handleChipClick={(event) => this.handleChipClick(event, followType, id)}
          />
        </div>
      )
    })
  }

  handleTabChange = (value) => this.setState({ slideIndex: value })

  renderModal(followType, data) {
    const result = []
    const authorsFollowed = R.prop('authors', data)
    const readersFollowed = R.prop('readers', data)

    if (followType === 'followers') {
      result.push(
        <div
          className='modal-chips row large-up-3 medium-up-2 small-up-1 rf-modal'
          key={'users-following-this-user'}
        >
          {this.renderUsers(followType, readersFollowed)}
        </div>
      )
    } else {
      result.push(
        <div key={'users-this-user-is-following'}>
          <Tabs
            onChange={this.handleTabChange}
            value={this.state.slideIndex}
            style={styles.tabContainer}
            inkBarStyle={styles.currentTab}
          >
            <Tab
              label={readersFollowed ? `${readersFollowed.length} Readers` : '0 Readers'}
              value={0}
              className='row center-text'
              key={'readers-following-tab'}
              style={styles.tab}
            />
            <Tab
              label={authorsFollowed ? `${authorsFollowed.length} Authors` : '0 Authors'}
              value={1}
              className='row center-text'
              key={'authors-following-tab'}
              style={styles.tab}
            />
          </Tabs>
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleTabChange}
            key={'swipe'}
          >
            <div style={styles.headline} key={'readers-following'}>
              <div
                className='modal-chips rf-modal row large-up-3 medium-up-2 small-up-1'
                key={'users-following-this-user'}
              >
                {this.renderUsers(followType, readersFollowed)}
              </div>
            </div>
            <div style={styles.slide} key={'authors-following'}>
              <div
                className='modal-chips row large-up-3 medium-up-2 small-up-1'
                key={'users-following-this-user'}
              >
                {this.renderUsers(followType, authorsFollowed)}
              </div>
            </div>
          </SwipeableViews>
        </div>
      )
    }
    return result
  }

  render() {
    const {
      modalOpen,
      handleClose,
      count,
      followers,
      followed,
      followType
    } = this.props

    const readersAndAuthors = (results) => {
      const defaults = { readers: [], authors: [] }

      // TODO: remove once API team normalizes responses for follower/followed endpoints
      if (R.isNil(results)) { return {} }
      if (R.isArrayLike(results)) { return { readers: results, authors: [] } }
      return R.merge(defaults, results)
    }

    //const followersData = followers.result ? followers.result : []
    //const followedData = followed.result ? followed.result : []
    //const data = followType === 'followers' ? followersData : followedData[0]

    const followersData = readersAndAuthors(followers.results)
    const followedData = readersAndAuthors(followed.results)
    const data = followType === 'followers' ? followersData : followedData
    console.log(data)
    //const data = undefined
    const title = followType === 'followers' ? 'Followers' : 'Following'

    return (
      <div className='follow-modal'>
        <Dialog
          bodyClassName='modal-content'
          bodyStyle={styles.modalBody}
          contentStyle={styles.modalContent}
          modal={false}
          open={modalOpen}
          onRequestClose={handleClose}
          autoDetectWindowHeight={false}
          autoScrollBodyContent={true}
        >
          <img
            src='./image/close.png'
            className='general-font center-text signup-modal-x'
            onClick={handleClose}
          /><br />

          <div style={styles.header} className='center-text modal-heading'>
            <h4>
              <strong> {count} </strong>
              {title} {/** Derrick: Do text-transform:capitalize; for this **/}
            </h4>
          </div>
          {R.isEmpty(data) ? null : this.renderModal(followType, data)}
        </ Dialog>
      </div>
    )
  }
}

const mapStateToProps = ({
  social: {
    followed = {},
    followers = {},
  }
}) => {
  return {
    followed,
    followers,
  }
}

const mapDispatchToProps = {
  updateFollowed,
  updateFollowers
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowModal)
