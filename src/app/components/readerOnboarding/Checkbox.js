import React from 'react'
import { CardHeader } from 'material-ui'

// TODO: rename? `Checkbox` is a little generic for something talking about authors/readers
const Checkbox = ({
  id,
  firstName,
  lastName,
  image,
  booksWritten,
  aboutSlogan,
  handleCheckBoxClick,
  isChecked,
  dataType,
}) => {
  {/** TODO: need to account for if name is too long needs '...'**/}
  return (
    <div>
        <div className='checkbox-wrapper'>
          <input
            id={id}
            name={dataType}
            type='checkbox'
            checked={isChecked}
            onChange={() => handleCheckBoxClick(id)}
          />
          <div className='checkbox-info-wrapper'>
            <CardHeader
              title={`${firstName} ${lastName}`}
              subtitle={(booksWritten ? `Author of ${booksWritten[0]}` : null) || aboutSlogan}
              avatar={image}
            />
          </div>
        </div>
    </div>
  )
}

export default Checkbox
