import React from 'react'

const styles = {
  layer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  mention: {
    position: 'relative'
  }
}

const renderSuggestion = (entry, type, ctype) => {
  switch (type) {
    case 'Reader':
      return (
        <li key={entry.id} style={styles.mention}>
          <div
            data-id={entry.id}
            data-contentType={ctype}
            data-type={type}
            data-display={`${entry.firstName} ${entry.lastName}`}
            style={styles.layer}
          />
          <img src={entry.image} alt='User image'/>
          <span>User: {`${entry.firstName} ${entry.lastName}`}</span>
        </li>
      )
    case 'Author':
      return (
        <li key={entry.id} style={styles.mention}>
          <div
            data-id={entry.id}
            data-contentType={ctype}
            data-type={type}
            data-display={`${entry.firstName} ${entry.lastName}`}
            style={styles.layer}
          />
          <img src={entry.image} alt='User image'/>
          <span>Author: {`${entry.firstName} ${entry.lastName}`}</span>
        </li>
      )
    case 'Book':
      return (
        <li key={entry.id} style={styles.mention}>
          <div
            data-id={entry.id}
            data-contentType={ctype}
            data-type={type}
            data-display={entry.title}
            style={styles.layer}
          />
          <img src={entry.image} alt='User image'/>
          <span>Book: {entry.title}</span>
        </li>
      )
    case 'Publisher':
      return (
        <li key={entry.id} style={styles.mention}>
          <div
            data-id={entry.id}
            data-contentType={ctype}
            data-type={type}
            data-display={entry.title}
            style={styles.layer}
          />
          <img src={entry.image} alt='User image'/>
          <span>Publisher: {entry.title}</span>
        </li>
      )
    default:
      return null
  }
}

const SuggestionList = ({ entries, onMentionListClick }) => {
  const { readers, authors, books, publishers, ctypes } = entries
  return (
    <ul className='suggestion-list' onClick={onMentionListClick}>
      {readers.map((reader) => renderSuggestion(reader, 'Reader', ctypes.readers))}
      {authors.map((author) => renderSuggestion(author, 'Author', ctypes.authors))}
      {books.map((book) => renderSuggestion(book, 'Book', ctypes.books))}
      {publishers.map((publisher) => renderSuggestion(publisher, 'Publisher', ctypes.publishers))}
    </ul>
  )
}

export default SuggestionList
