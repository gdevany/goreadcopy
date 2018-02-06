import React from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite-border';
import ChatBubbleIcon from 'material-ui/svg-icons/communication/chat-bubble-outline';
import moment from 'moment';
import { DateFormats } from '../../constants';
import InterpunctedTextList from '../common/InterpunctedTextList';
import GoReadIcon from '../common/GoReadIcon';

export default class Article extends React.PureComponent {
  static propTypes = {
    picture: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    readTime: PropTypes.number.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
    }).isRequired,
    likes: PropTypes.number,
    comments: PropTypes.number,
    mini: PropTypes.bool,
  }

  static defaultProps = {
    mini: false,
    likes: 0,
    comments: 0,
  }

  getHeader() {
    const { picture, title } = this.props;

    return (
      <div className="Article__header">
        <img alt={title} src={picture} />
      </div>
    );
  }

  getContent() {
    const { mini } = this.props;

    if (mini) {
      return (
        <div className="Article__content">
          {this.getCategory()}
          {this.getTitle()}
          {this.getAuthorAndPostInfo()}
        </div>
      );
    }

    return (
      <div className="Article__content">
        {this.getTitle()}
        {this.getAuthorAndPostInfo()}
      </div>
    );
  }

  getLikes() {
    const { likes } = this.props;

    return (
      <span className="Article__likes">
        <FavoriteIcon />
        {likes}
      </span>
    );
  }

  getComments() {
    const { comments } = this.props;

    return (
      <span className="Article__comments">
        <ChatBubbleIcon />
        {comments}
      </span>
    );
  }

  getShare() {
    const { mini } = this.props;

    if (mini) {
      return null;
    }

    return (
      <span className="Article__share">
        <GoReadIcon icon="share-light" />
        Share
      </span>
    );
  }

  getSocial() {
    return (
      <div className="Article__social-section">
        <div>
          {this.getLikes()}
          {this.getComments()}
        </div>
        <div>
          {this.getShare()}
        </div>
      </div>
    );
  }

  getCategory() {
    const { category } = this.props;

    return (<span className="Article__category">{category}</span>);
  }

  getTitle() {
    const { title } = this.props;

    return (<h3 className="Article__title">{title}</h3>);
  }

  getAuthorProfilePic() {
    const { author } = this.props;
    const { name, picture } = author;

    return (
      <div className="Article__profile-picture">
        <img alt={name} src={picture} />
      </div>
    );
  }

  getDate() {
    const { date } = this.props;

    return moment(date).format(DateFormats.MINI_MONTH_WITH_DAY);
  }

  getReadTime() {
    const { readTime } = this.props;

    return `${readTime} min read`;
  }

  getAuthorAndPostInfo() {
    const { author, category, mini } = this.props;
    const { name, picture } = author;

    const items = mini ? [this.date, this.readTime] : [this.date, this.readTime, category];
    const renderItem = item => (item === category ? this.category : item);

    return (
      <div className="Article__author-and-post-info">
        <div className="Article__author-profilepic">
          <img alt={name} src={picture} />
        </div>
        <div className="Article__info">
          <h4 className="Article__author-name">{name}</h4>
          <InterpunctedTextList items={items} renderItem={renderItem} />
        </div>
      </div>
    );
  }

  getClasses() {
    const { mini } = this.props;

    if (mini) {
      return cls('Article', 'Article--mini');
    }

    return cls('Article');
  }

  render() {
    return (
      <div className={this.getClasses()}>
        {this.getHeader()}
        {this.getContent()}
        {this.getSocial()}
      </div>
    );
  }
}
