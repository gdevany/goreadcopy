import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { AvatarSummary } from '../common'
import { Dialog, Tabs, Tab } from 'material-ui'
import SwipeableViews from 'react-swipeable-views'
import R from 'ramda'

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
    // const { followed, followers } = this.props
    // TODO: set these actions up
    // if (followed.length) this.props.updateFollowed({ followed })
    // if (followers.length) this.props.updateFollowers({ followers })
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

  isChosen(id, followType) {
    return (followType === 'followers') ?
      R.contains(id, this.state.followers) :
      R.contains(id, this.state.followed)
  }

  renderUsers = (followType, users) => {
    return users.map((user, index) => {
      const {
        id,
        title,
        image,
        description
      } = user

      return (
        <div className='column column-block' key={id}>
          <AvatarSummary
            id={id}
            key={id}
            title={title}
            image={image}
            description={description}
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
          className='modal-chips row large-up-3 medium-up-2 small-up-1'
          key={'users-following-this-user'}
        >
          {this.renderUsers(followType, data)}
        </div>
      )
    } else {
      result.push(
        <div key={'users-this-user-is-following'}>
          <Tabs
            onChange={this.handleTabChange}
            value={this.state.slideIndex}
          >
            <Tab
              label={`${readersFollowed.length} Readers`}
              value={0}
              className='row center-text'
              key={'readers-following-tab'}
            />
            <Tab
              label={`${authorsFollowed.length} Authors`}
              value={1}
              className='row center-text'
              key={'authors-following-tab'}
            />
          </Tabs>
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleTabChange}
            key={'swipe'}
          >
            <div style={styles.headline} key={'readers-following'}>
              <div
                className='modal-chips row large-up-3 medium-up-2 small-up-1'
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

    const followersData = followers.result ? followers.result : []
    const followedData = followed.result ? followed.result : []
    const data = followType === 'followers' ? followersData : followedData[0]

    return (
      <div className='read-feed'>
        <Dialog
          bodyClassName='follow-modal-content'
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

          <div className='center-text modal-heading'>
            <h4>
              <strong> {count} </strong>
              {followType} {/** Derrick: Do text-transform:capitalize; for this **/}
            </h4>
          </div>
          {this.renderModal(followType, data)}
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

export default connect(mapStateToProps)(FollowModal)
