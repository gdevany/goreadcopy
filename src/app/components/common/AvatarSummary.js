import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import { Chip } from 'material-ui'
import { Colors, Breakpoints } from '../../constants/style'
import { Follow } from '../../redux/actions'

const {
  followOrUnfollow,
} = Follow

const styles = {
  infoContainer: {
    padding: 0,
  },

  item: {
    marginBottom: 30,
    minHeight: 69,
  },

  nameText: {
    fontSize: 18,
    fontWeight: 700,
  },

  subTitleText: {
    color: Colors.black,
  },

  textContainer: {
    padding: 0,
    width: '70%',
  },

  chip: {
    backgroundColor: Colors.white,
    border: `1px solid ${Colors.blue}`,
    borderRadius: 25,
    color: Colors.blue,
    cursor: 'pointer',
    display: 'inline-block',
    margin: '10px 10px 0px 10px',
    padding: 5,

    [Breakpoints.tablet]: {
      marginRight: 0,
    },

    ':hover': {
      backgroundColor: Colors.blue,
      color: Colors.white,
      cursor: 'pointer',
    },
  },

  chipText: {
    color: Colors.blue,
    fontSize: 14,
  },

  checkmark: {
    marginRight: 7,
  },
}

class AvatarSummary extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isChosen: this.props.isChosen,
      badgeText: this.props.isChosen ? 'Following' : 'Follow',
    }

    this.handleChipClick = this.handleChipClick.bind(this)
  }

  handleChipClick() {
    const isChosenNow = !this.state.isChosen
    const {
      id,
      userType,
      context,
      followOrUnfollow,
    } = this.props

    followOrUnfollow({
      follow: isChosenNow,
      context,
      userType,
      ids: [id],
    })
    this.setState({
      isChosen: isChosenNow,
      badgeText: isChosenNow ? 'Following' : 'Follow'
    })
    this.props.onClick()
  }

  handleTextChange = () => {
    const { isChosen } = this.state
    if (isChosen) {
      this.setState({
        badgeText: 'Unfollow'
      })
    } else {
      this.setState({
        badgeText: 'Follow'
      })
    }
  }

  handleLeaveTextChange = () => {
    const { isChosen } = this.state

    this.setState({
      badgeText: isChosen ? 'Following' : 'Follow'
    })
  }

  render() {
    const {
      id,
      title,
      image,
      description,
      booksWritten,
      link,
    } = this.props

    const { isChosen } = this.state

    const subtitle = booksWritten ? `Author of ${booksWritten[0]}` : description

    return (
      <div className='row' style={styles.item} key={id}>
        <div className='small-10 small-offset-1 large-12 columns'>
          <div className='avatar-summary-container'>
            <figure className='avatar-summary-figure'>
              <a href={link}>
                <img src={image}/>
              </a>
            </figure>
            <div className='avatar-summary-details-container'>
              <div className='avatar-summary-title'>
                <a href={link}>
                  {title}
                </a>
              </div>
              <div className='avatar-summary-subtitle'>
                <a href={link}>
                  {subtitle}
                </a>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='small-10 small-offset-2 medium-12 columns'>
              <Chip
                key={id}
                value={id}
                className={isChosen ?
                  'is-following-reader chosenFollow' : 'is-not-following-reader'
                }
                labelStyle={styles.chipText}
                style={styles.chip}
                onClick={this.handleChipClick}
                onMouseEnter={this.handleTextChange}
                onMouseLeave={this.handleLeaveTextChange}
              >
                {isChosen ?
                  <img style={styles.checkmark} src='/image/checkmark.png' /> :
                  <img style={styles.checkmark} src='/image/plus.png' />
                }
                  {this.state.badgeText}
              </Chip>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AvatarSummary.defaultProps = {
  onClick: () => null
}

const mapDispatchToProps = {
  followOrUnfollow,
}

export default connect(null, mapDispatchToProps)(Radium(AvatarSummary))
