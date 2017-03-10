import React from 'react'
import Radium from 'radium'
import { CardHeader, Chip } from 'material-ui'
import { Colors, Breakpoints } from '../../constants/style'

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

const AuthorRecSummary = ({
  id,
  title,
  image,
  description,
  booksWritten,
  handleChipClick,
  isChosen,
  followType,
}) => {

  const chosen = followType ? isChosen(id, followType) : isChosen(id)
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
          className={chosen ? 'chosenFollow' : null}
          labelStyle={styles.chipText}
          style={styles.chip}
          onClick={handleChipClick}
        >
          {chosen ?
            <img style={styles.checkmark} src='./image/checkmark.png' /> :
            <img style={styles.checkmark} src='./image/plus.png' />
          }
            {chosen ? 'Following' : 'Follow'}
        </Chip>

      </div>
    </div>
  )
}

export default Radium(AuthorRecSummary)
