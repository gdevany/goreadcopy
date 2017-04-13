import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import AvatarSummary from './AvatarSummary'
import { Dialog, Tabs, Tab } from 'material-ui'
import SwipeableViews from 'react-swipeable-views'
import { Colors } from '../../constants/style'
import { Users as U } from '../../services'
import { PageScroller } from './'
import { Follow } from '../../redux/actions'
import RefreshIndicator from 'material-ui/RefreshIndicator'

const { fetchFollowers, fetchFollowed } = Follow

import R from 'ramda'

const { TYPES: { READER, AUTHOR } } = U

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
    marginBottom: 15,
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
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
  refreshContainer: {
    textAlign: 'center',
  }
}

class FollowModal extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      slideIndex: 0,
    }
  }

  setLoading = () => {
    return (
      <div style={styles.refreshContainer}>
        <RefreshIndicator
          size={50}
          left={0}
          top={0}
          loadingColor={Colors.blue}
          status='loading'
          style={styles.refresh}
        />
      </div>
    )
  }

  renderUsers = (userType, followType, users) => {
    return users.map((attrs, index) => {
      const {
        id,
      } = attrs

      const user = U.from(attrs)

      return (
        <div className='column column-block' key={id}>
          <AvatarSummary
            id={id}
            key={id}
            description={U.description(user)}
            title={U.fullName(user)}
            image={U.imageUrl(user)}
            followType={followType}
            userType={userType}
            isChosen={true}
          />
        </div>
      )
    })
  }

  fetchHandler = R.curry((id, params) => {
    this.props.fetchFollowers(id, params)
  })

  fetchFollowedHandler = R.curry((id, params) => {
    this.props.fetchFollowed(id, params)
  })

  handleTabChange = (value) => this.setState({ slideIndex: value })

  renderModal(followType, data) {
    const result = []
    const authorsFollowed = R.prop('authors', data)
    const readersFollowed = R.prop('readers', data)
    const { id, followers, followed } = this.props

    if (followType === 'followers') {
      result.push(
        <div
          className='modal-chips row large-up-3 medium-up-2 small-up-1 rf-modal'
          key={'users-following-this-user'}
        >
          <PageScroller
            clsName='modal-chips row large-up-3 medium-up-2 small-up-1 rf-modal followers-scroll'
            fetchOnLoad={false}
            fetchHandler={this.fetchHandler(id)}
            isLocked={followers ? followers.locked : false}
            currentPage={followers && followers.page ? followers.page : 0}
          >
            {this.renderUsers(READER, followType, readersFollowed)}
          </PageScroller>
          { followers && followers.locked ? this.setLoading() : null }
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
              <PageScroller
                clsName={
                  'modal-chips row large-up-3 medium-up-2 small-up-1 rf-modal followers-scroll'
                }
                key={'users-following-this-user'}
                fetchOnLoad={false}
                fetchHandler={this.fetchFollowedHandler(id)}
                isLocked={followed ? followed.locked : false}
                currentPage={followed && followed.page ? followed.page / 1 : 0}
              >
                {this.renderUsers(READER, followType, readersFollowed)}
              </PageScroller>
            </div>
            <div style={styles.slide} key={'authors-following'}>
              <PageScroller
                clsName={
                  'modal-chips row large-up-3 medium-up-2 small-up-1 rf-modal followers-scroll'
                }
                key={'users-following-this-user'}
                fetchOnLoad={false}
                fetchHandler={this.fetchFollowedHandler(id)}
                isLocked={followed ? followed.locked : false}
                currentPage={followed && followed.page ? followed.page / 1 : 0}
              >
                {this.renderUsers(AUTHOR, followType, authorsFollowed)}
              </PageScroller>
            </div>
          </SwipeableViews>
          { followed && followed.locked ? this.setLoading() : null }
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

    const followersData = readersAndAuthors(followers.results)
    const followedData = readersAndAuthors(followed.results)
    const data = followType === 'followers' ? followersData : followedData
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
            src='/image/close.png'
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
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = ({
  currentReader: {
    id,
  },
  social: {
    followed = {},
    followers = {},
  }
}) => {
  return {
    followed,
    followers,
    id,
  }
}

const mapDispatchToProps = {
  fetchFollowers,
  fetchFollowed,
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowModal)
