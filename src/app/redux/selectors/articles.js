import { createSelector } from 'reselect';

const getShortDescription = (desc) => {
  const description = desc || '';

  return description.length > 250 ? `${description.substring(0, 250)} ...` : description;
};

export const mapArticleToProps = ({
  article, likes, comments, likedByReader,
}) => ({
  url: article.link,
  id: article.id,
  picture: article.imageUrl,
  title: article.title,
  category: article.category && article.category.display,
  content: article.header,
  date: new Date(article.publishedDate * 1000),
  readTime: article.readTime,
  author: {
    name: article.owner.fullname,
    picture: article.owner.imageUrl,
    url: article.owner.url,
  },
  likes: likes.count,
  comments: comments.count,
  isLikedByUser: likedByReader,
});

export const mapContributorsToProps = ({
  id,
  aboutMe,
  imageUrl,
  url,
  fullname,
}) => ({
  url,
  key: id,
  description: getShortDescription(aboutMe),
  name: fullname,
  picture: imageUrl,
});

export const mapTopicsToProps = (topics = []) => topics.map(({ slug, name }) => ({
  key: slug,
  name,
}));

export const getCommentWithReplies = (entities, id) => {
  const comment = entities[id];
  const replies = comment.replies && comment.replies.length > 0 ?
    comment.replies.map(replyId => getCommentWithReplies(entities, replyId)) : [];

  return ({
    id: comment.id,
    parentId: comment.parentId,
    date: comment.datetime,
    content: comment.comment,
    profile: comment.profile,
    replies,
  });
};

export const getState = state => state.articles;

export const getCurrentReader = state => state.currentReader;

export const yourTopicsSelector = createSelector(
  getCurrentReader,
  (currentReader = {}) => ({
    isAuthenticated: !!currentReader.token,
    topics: mapTopicsToProps(currentReader.genreIds),
  }),
);

export const getEntities = createSelector(
  getState,
  articles => articles.entities,
);

export const getNewestArticlesState = createSelector(
  getState,
  articles => articles.newest,
);

export const getTopContributors = createSelector(
  getState,
  articles => articles.topContributors,
);

export const getTop5ArticlesState = createSelector(
  getState,
  articles => articles.top5,
);

export const getTop50ArticlesState = createSelector(
  getState,
  articles => articles.top50,
);

export const getTop5Articles = createSelector(
  getEntities,
  getTop5ArticlesState,
  (entities, top5) => (top5.byIds.map(id => entities[id])),
);

export const getTop50Articles = createSelector(
  getEntities,
  getTop50ArticlesState,
  (entities, top50) => (top50.byIds.map(id => entities[id])),
);

export const getSharingArticleId = createSelector(
  getState,
  state => state.sharing,
);

export const getCommentingArticleId = createSelector(
  getState,
  state => state.comments.commenting,
);

export const articlesListSelector = createSelector(
  getNewestArticlesState,
  state => ({
    articles: state.byIds,
    isFetching: state.isFetching,
    page: state.page,
    perPage: state.perPage,
    count: state.count,
  }),
);

export const articleSelectorFactory = () => createSelector(
  [getEntities, (state, props) => props],
  (entities, props) => ({ ...mapArticleToProps(entities[props.id]), id: props.id }),
);

export const top50ArticlesSelector = createSelector(
  getTop50ArticlesState,
  getTop50Articles,
  state => ({
    articles: state.byIds,
    isFetching: state.isFetching,
  }),
);

export const top5ArticlesSelector = createSelector(
  getTop5ArticlesState,
  getTop5Articles,
  state => ({
    articles: state.byIds,
    isFetching: state.isFetching,
  }),
);

export const getIsFetchingComments = () => false;

export const getCommentsForCommentModal = createSelector(
  getState,
  (state) => {
    const { entities, articleComments } = state.comments;

    return articleComments.map(id => getCommentWithReplies(entities, id));
  },
);

export const topContributorsSelector = createSelector(
  getTopContributors,
  topContributors => ({
    contributors: topContributors.entities.map(mapContributorsToProps),
    isFetching: topContributors.isFetching,
    page: topContributors.page,
    perPage: topContributors.perPage,
    count: topContributors.count,
  }),
);
