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

const renderSuggestion = (entry, type) => {
  switch (type) {
    case 'Reader':
      return (
        <li key={entry.id} style={styles.mention}>
          <div
            data-id={entry.id}
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
  return (
    <ul className='suggestion-list' onClick={onMentionListClick}>
      {entries.readers.map((reader) => renderSuggestion(reader, 'Reader'))}
      {entries.authors.map((author) => renderSuggestion(author, 'Author'))}
      {entries.books.map((book) => renderSuggestion(book, 'Book'))}
      {entries.publishers.map((publisher) => renderSuggestion(publisher, 'Publisher'))}
    </ul>
  )
}

export default SuggestionList
