import React from 'react'
import { CardHeader } from 'material-ui'
import { Colors } from '../../constants/style'

const styles = {
  checkboxContainer: {
    marginTop: 5,
  },

  infoContainer: {
    padding: '0 0 0 30px',
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
}

// TODO: rename? `Checkbox` is a little generic for something talking about authors/readers
const Checkbox = ({
  id,
  firstName,
  lastName,
  image,
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
    <div style={styles.item}>
      <div style={styles.checkboxContainer} className='checkbox-wrapper'>
        <input
          id={id}
          name={dataType}
          type='checkbox'
          onClick={() => onClick(id)}
          checked={isChecked}
        />
      </div>

      <div className='checkbox-info-wrapper'>
        <CardHeader
          title={`${firstName} ${lastName}`}
          titleStyle={styles.nameText}
          subtitle={subtitle}
          subtitleStyle={styles.subTitleText}
          avatar={image}
          style={styles.infoContainer}
        />
      </div>
    </div>
  )
}

export default Checkbox
