import React from 'react';
import moment from 'moment';
import { Footer } from '../common';
import Article from './Article';
import { BaseNavView } from '../views';

const article = {
  picture: 'http://via.placeholder.com/200x200',
  title: 'Why You Should Travel The World',
  date: moment().toDate(),
  readTime: 8,
  likes: 97,
  comments: 10,
  category: 'travel',
  author: {
    name: 'Sandra Stevens',
    picture: 'http://via.placeholder.com/40x40',
  }
}

console.log('Article', Article);

export default class ArticlesPage extends React.PureComponent {
  render() {
    return (
      <BaseNavView>
        <div className="ArticlePage">
          <div style={{width: '200px', marginLeft: '20px'}}>
            <Article
              mini
              {...article}
            />
          </div>
          <Footer />
        </div>
      </BaseNavView>
    );
  }
}
