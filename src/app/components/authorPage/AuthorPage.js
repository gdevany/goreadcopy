import React, { PureComponent } from 'react';
import { BaseNavView } from '../views';
import {
  AuthorTabMenu,
  AuthorPageContent,
  AuthorBackground,
  AuthorMainContainer,
} from './';

const author = {
  img: 'https://34slpa7u66f159hfp1fhl9aur1-wpengine.netdna-ssl.com/wp-content/uploads/2016/11/generic-profile.png',
  title: 'Bob Peterson',
  fanCount: '24,316',
  isFollowing: true,
  hasFacebook: true,
  hasTwitter: true,
  hasLinkedin: true,
  hasInstagram: true,
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et ante ut nunc tempor porttitor. Quisque ac efficitur nisl. Aliquam ultrices, velit ac suscipit porttitor, nulla augue tempus quam, in sodales quam risus consectetur felis. Suspendisse imperdiet urna nec molestie pharetra. Nam mattis, velit auctor scelerisque ultrices, justo quam placerat est, a euismod erat lectus in mi. Donec imperdiet ut orci in mollis. Phasellus quis est eleifend, bibendum ex ut, semper quam. Duis vel nibh tortor. Donec venenatis nisl eu libero lacinia vehicula. Fusce porta ipsum sem, nec molestie justo sagittis vel. Donec lorem erat, ultricies quis nunc quis, sollicitudin iaculis urna. Maecenas sit amet mauris ultricies, tincidunt magna eu, hendrerit ligula. Proin iaculis ligula id ante dictum ullamcorper. Integer lobortis id odio non aliquet. Nulla maximus tellus ac facilisis viverra.',
  id: 22856,
  currentReader: true,
  isOwnPage: false,
  tweets: [
    {
      name: 'Bob Peterson',
      img: 'https://34slpa7u66f159hfp1fhl9aur1-wpengine.netdna-ssl.com/wp-content/uploads/2016/11/generic-profile.png',
      id: '@bobpete17',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in laoreet erat. Donec at consectetur arcu.',
      tweet_id: 234112,
    },
    {
      name: 'Bob Peterson',
      img: 'https://34slpa7u66f159hfp1fhl9aur1-wpengine.netdna-ssl.com/wp-content/uploads/2016/11/generic-profile.png',
      id: '@bobpete17',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in laoreet erat. Donec at consectetur arcu.',
      tweet_id: 123123,
    },
    {
      name: 'Bob Peterson',
      img: 'https://34slpa7u66f159hfp1fhl9aur1-wpengine.netdna-ssl.com/wp-content/uploads/2016/11/generic-profile.png',
      id: '@bobpete17',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in laoreet erat. Donec at consectetur arcu.',
      tweet_id: 512312,
    },
  ],
};

class AuthorPage extends PureComponent {
  render() {
    const { params } = this.props;
    return (
      <BaseNavView>
        <div className="author-page-container row">
          <AuthorTabMenu name={author.title} ownPage={author.isOwnPage} tab={params.tab} />
          <AuthorBackground tab={params.tab} />
          <AuthorMainContainer author={author} tab={params.tab}>
            <AuthorPageContent author={author} content={params.tab} />
          </AuthorMainContainer>
        </div>
      </BaseNavView>
    );
  }
}

export default AuthorPage;
