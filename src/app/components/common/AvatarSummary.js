import React from 'react'
import { CardHeader, Chip } from 'material-ui'
import { Colors } from '../../constants/style'

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
    display: 'inline-block',
    margin: '30px 15px 0px 0px',
    padding: 7,
  },

  chipText: {
    color: Colors.blue,
    fontSize: 16,
  },

  checkmark: {
    marginRight: 7,
  },
}

const AvatarSummary = ({
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
      <div className='small-10 columns'>
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

export default AvatarSummary
