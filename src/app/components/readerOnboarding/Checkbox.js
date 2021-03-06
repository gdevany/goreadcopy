import React from 'react'
import { CardHeader } from 'material-ui'
import { Colors } from '../../constants/style'

const styles = {
  checkboxContainer: {
    marginTop: 5,
  },

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
}

// TODO: rename? `Checkbox` is a little generic for something talking about authors/readers
const Checkbox = ({
  id,
  fullname,
  imageUrl,
  booksWritten,
  inspiredBy,
  dataType,
  onClick,
  isChecked,
}) => {
  {/** TODO: need to account for if name is too long needs '...'**/}
  const subtitle = (booksWritten ? `Author of ${booksWritten[0]}` : null) ||
    (inspiredBy ? `Inspired by ${inspiredBy}` : null)

  return (
    <div className='row' style={styles.item}>
      <div style={styles.checkboxContainer} className='small-2 columns checkbox-wrapper'>
        <input
          id={id}
          name={dataType}
          type='checkbox'
          onClick={() => onClick(id)}
          checked={isChecked}
        />
      </div>

      <div className='small-10 columns checkbox-info-wrapper'>
        <CardHeader
          title={`${fullname}`}
          titleStyle={styles.nameText}
          textStyle={styles.textContainer}
          subtitle={subtitle}
          subtitleStyle={styles.subTitleText}
          avatar={imageUrl}
          style={styles.infoContainer}
        />
      </div>
    </div>
  )
}

export default Checkbox
