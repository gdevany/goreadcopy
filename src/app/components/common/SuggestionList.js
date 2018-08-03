import React from 'react';

const styles = {
  layer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
};

const renderSuggestion = (entry, type, ctype) => {
  switch (type) {
    case 'Reader':
      return (
        <li
          className="suggestion-list-element"
          key={entry.id}
        >
          <div
            data-id={entry.id}
            data-contentType={ctype}
            data-type={type}
            data-display={`${entry.firstName} ${entry.lastName}`}
            style={styles.layer}
          />
          <img className="sugestion-list-image" src={entry.image} alt="" />
          <div className="suggestion-list-description">
            <span className="suggestion-list-name">
              Reader: {`${entry.firstName} ${entry.lastName}`}
            </span>
            <span className="tooltiptext">
              {`${entry.firstName} ${entry.lastName}`}
            </span>
          </div>
        </li>
      );
    case 'Author':
      return (
        <li
          className="suggestion-list-element"
          key={entry.id}
        >
          <div
            data-id={entry.id}
            data-contentType={ctype}
            data-type={type}
            data-display={`${entry.firstName} ${entry.lastName}`}
            style={styles.layer}
          />
          <img className="sugestion-list-image" src={entry.image} alt="" />
          <div className="suggestion-list-description">
            <span className="suggestion-list-name">
              Author: {`${entry.firstName} ${entry.lastName}`}
            </span>
            <span className="tooltiptext">
              {`${entry.firstName} ${entry.lastName}`}
            </span>
          </div>
        </li>
      );
    case 'Book':
      return (
        <li
          className="suggestion-list-element"
          key={entry.ean}
        >
          <div
            data-id={entry.ean}
            data-contentType={ctype}
            data-type={type}
            data-display={entry.title}
            style={styles.layer}
          />
          <img className="sugestion-list-image" src={entry.imageUrl} alt="" />
          <div className="suggestion-list-description">
            <span className="suggestion-list-name">
              Book: {entry.title}
            </span>
            <span className="tooltiptext">
              {entry.title}
            </span>
          </div>
        </li>
      );
    case 'Publisher':
      return (
        <li
          className="suggestion-list-element"
          key={entry.id}
        >
          <div
            data-id={entry.id}
            data-contentType={ctype}
            data-type={type}
            data-display={entry.title}
            style={styles.layer}
          />
          <img className="sugestion-list-image" src={entry.image} alt="" />
          <div className="suggestion-list-description">
            <span className="suggestion-list-name">
              Publisher: {entry.title}
            </span>
            <span className="tooltiptext">
              {entry.title}
            </span>
          </div>
        </li>
      );
    default:
      return null;
  }
};

const SuggestionList = ({ entries, onMentionListClick, position }) => {
  const {
    readers,
    authors,
    books,
    publishers,
  } = entries;
  let renderReaders; let renderAuthors; let renderBooks; let renderPublisher;
  if (readers) {
    if (readers.results.length > 0) {
      renderReaders = readers.results.map((reader) => renderSuggestion(reader, 'Reader', readers.ctype));
    }
  }
  if (authors) {
    if (authors.results.length > 0) {
      renderAuthors = authors.results.map((author) => renderSuggestion(author, 'Author', authors.ctype));
    }
  }
  if (books) {
    if (books.results.length > 0) {
      renderBooks = books.results.map((book) => renderSuggestion(book, 'Book', books.ctype));
    }
  }
  if (publishers) {
    if (publishers.results.length > 0) {
      renderPublisher = publishers.results.map((publisher) => renderSuggestion(publisher, 'Publisher', publishers.ctype));
    }
  }
  return (
    <ul className="suggestion-list" onClick={onMentionListClick} style={position}>
      {renderReaders}
      {renderAuthors}
      {renderBooks}
      {renderPublisher}
    </ul>
  );
};

export default SuggestionList;
