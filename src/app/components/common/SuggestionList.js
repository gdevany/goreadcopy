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
        <li
          className='suggestion-list-element'
          key={entry.id}
          style={styles.mention}
        >
          <div
            data-id={entry.id}
            data-contentType={ctype}
            data-type={type}
            data-display={`${entry.firstName} ${entry.lastName}`}
            style={styles.layer}
          />
          <img className='sugestion-list-image' src={entry.image} alt='User image'/>
          <span className='suggestion-list-name'>
            Reader: {`${entry.firstName} ${entry.lastName}`}
          </span>
        </li>
      )
    case 'Author':
      return (
        <li
          className='suggestion-list-element'
          key={entry.id}
          style={styles.mention}
        >
          <div
            data-id={entry.id}
            data-contentType={ctype}
            data-type={type}
            data-display={`${entry.firstName} ${entry.lastName}`}
            style={styles.layer}
          />
          <img className='sugestion-list-image' src={entry.image} alt='User image'/>
          <span className='suggestion-list-name'>
            Author: {`${entry.firstName} ${entry.lastName}`}
          </span>
        </li>
      )
    case 'Book':
      return (
        <li
          className='suggestion-list-element'
          key={entry.id}
          style={styles.mention}
        >
          <div
            data-id={entry.id}
            data-contentType={ctype}
            data-type={type}
            data-display={entry.title}
            style={styles.layer}
          />
          <img className='sugestion-list-image' src={entry.image} alt='User image'/>
          <span className='suggestion-list-name'>Book: {entry.title}</span>
        </li>
      )
    case 'Publisher':
      return (
        <li
          className='suggestion-list-element'
          key={entry.id}
          style={styles.mention}
        >
          <div
            data-id={entry.id}
            data-contentType={ctype}
            data-type={type}
            data-display={entry.title}
            style={styles.layer}
          />
          <img className='sugestion-list-image' src={entry.image} alt='User image'/>
          <span className='suggestion-list-name'>Publisher: {entry.title}</span>
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
