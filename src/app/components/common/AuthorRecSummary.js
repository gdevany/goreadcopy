import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import { CardHeader, Chip } from 'material-ui'
import { Colors } from '../../constants/style'
import { Follow } from '../../redux/actions'
const {
  removeFollowedAuthors,
  updateFollowedAuthors,
} = Follow

const styles = {
  infoContainer: {
    padding: 0,
  },

  nameText: {
    color: Colors.black,
    marginBottom: 5,
    fontSize: 16,
  },

  subTitleText: {
    fontSize: 14,
    color: Colors.grey,
  },

  textContainer: {
    padding: 0,
    textAlign: 'left',
    width: '70%',
  },

  chip: {
    backgroundColor: Colors.white,
    border: `1px solid ${Colors.blue}`,
    borderRadius: 25,
    color: Colors.blue,
    cursor: 'pointer',
    display: 'inline-block',
    margin: '15px 15px 0px 20px',
    padding: 5,

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

class AuthorRecSummary extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isChosen: false,
    }

    this.handleChipClick = this.handleChipClick.bind(this)
  }

  handleChipClick() {
    const isChosenNow = !this.state.isChosen
    const { id, context } = this.props
    this.setState({ isChosen: isChosenNow })

    const followOrUnfollow =
      isChosenNow ?
      this.props.updateFollowedAuthors({ authorIds: [id], context }) :
      this.props.removeFollowedAuthors({ authorIds: [id], context })

    followOrUnfollow.then(this.props.onClick)
  }

  render() {
    const {
      id,
      title,
      image,
      description,
      booksWritten,
    } = this.props

    const { isChosen } = this.state

    const subtitle = booksWritten ? `Author of ${booksWritten[0]}` : description

    return (
      <div className='row' style={styles.item} key={id}>
        <div className='small-12 columns'>
          <CardHeader
            title={title}
            titleStyle={styles.nameText}
            textStyle={styles.textContainer}
            subtitle={subtitle}
            subtitleStyle={styles.subTitleText}
            avatar={image}
            style={styles.infoContainer}
          />

          <Chip
            key={id}
            value={id}
            className={isChosen ? 'chosenFollow' : null}
            labelStyle={styles.chipText}
            style={styles.chip}
            onClick={this.handleChipClick}
          >
            {isChosen ?
              <img style={styles.checkmark} src='/image/checkmark.png' /> :
              <img style={styles.checkmark} src='/image/plus.png' />
            }
              {isChosen ? 'Following' : 'Follow'}
          </Chip>

        </div>
      </div>
    )
  }
}

AuthorRecSummary.defaultProps = {
  onClick: () => null,
}

const mapDispatchToProps = {
  updateFollowedAuthors,
  removeFollowedAuthors,
}

export default connect(null, mapDispatchToProps)(Radium(AuthorRecSummary))
