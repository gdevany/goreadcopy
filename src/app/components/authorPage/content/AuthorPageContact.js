import React, { PureComponent } from 'react';

class AuthorPageContact extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      onFirstFocus: false,
      textarea: 'Write your message here...',
    };
  }

  handleFocus = () => {
    this.setState({
      onFirstFocus: true,
      textarea: '',
    });
  }

  render() {
    const { name } = this.props;
    const { onFirstFocus, textarea } = this.state;
    return (
      <div className="author-contact-container">
        <div className="author-contact-name">
          Name:&nbsp;
          <span className="author-contact-author">
            {name}
          </span>
        </div>
        <div className="author-contact-message">
          Message
          <textarea
            className={onFirstFocus ? 'contact-message' : 'contact-message-outfocus'}
            onClick={onFirstFocus ? null : this.handleFocus}
            placeholder={textarea}
          />
        </div>
        <div className="author-contact-button">
          <div className="contact-button">
            Send
          </div>
        </div>
      </div>
    );
  }
}

export default AuthorPageContact;
