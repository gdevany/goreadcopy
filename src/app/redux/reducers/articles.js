import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import _ from 'lodash';
import { ARTICLES } from '../const/actionTypes';

const {
  GET_TOP_5_ARTICLES_PENDING,
  GET_TOP_5_ARTICLES_FULFILLED,
  RESET_TOP_5_ARTICLES,
  GET_TOP_50_ARTICLES_PENDING,
  GET_TOP_50_ARTICLES_FULFILLED,
  RESET_TOP_50_ARTICLES,
  GET_NEWEST_ARTICLES_PENDING,
  GET_NEWEST_ARTICLES_FULFILLED,
  RESET_NEWEST_ARTICLES,
  GET_TOP_CONTRIBUTORS_PENDING,
  GET_TOP_CONTRIBUTORS_FULFILLED,
  LIKE_ARTICLE_FULFILLED,
  RESET_TOP_CONTRIBUTORS,
  SET_ARTICLE_TO_SHARE,
  RESET_ARTICLE_TO_SHARE,
  SET_ARTICLE_TO_COMMENT,
  GET_COMMENTS_FULFILLED,
  GET_COMMENTS_PENDING,
  COMMENT_ARTICLE_FULFILLED,
  RESET_COMMENTS,
  GET_ARTICLES_CATEGORIES_PENDING,
  GET_ARTICLES_CATEGORIES_FULFILLED,
  RESET_ARTICLES_CATEGORIES,
} = ARTICLES;

const initialState = {
  entities: {},
  top5: {
    isFetching: false,
    byIds: [],
  },
  top50: {
    isFetching: false,
    byIds: [],
  },
  newest: {
    isFetching: false,
    byIds: [],
    count: 0,
    perPage: 10,
    page: 0,
  },
  topContributors: {
    isFetching: false,
    entities: [],
    count: 0,
    perPage: 5,
    page: 0,
  },
  sharing: null,
  comments: {
    entities: {},
    articleComments: [],
    isFetching: false,
    commenting: null,
  },
  categories: {
    entities: {},
    byIds: [],
    count: null,
    perPage: 10,
    page: 0,
    sort: null,
  },
};

export const mapCommentsToEntities = (comments, parentId) => (comments.reduce((entities, comment) => {
  const children = comment.children || [];
  const repliesIds = children.map(({ id }) => id);
  const replies = children.length > 0 ?
    mapCommentsToEntities(comment.children, comment.id) : {};

  const normalizedComment = { ...comment, replies: repliesIds, parentId };

  const newEntities = {
    ...entities,
    ...replies,
    [normalizedComment.id]: _.omit(normalizedComment, 'children'),
  };

  return newEntities;
}, {}));

export const normalizeEntities = entitites => (entitites.reduce((normalizedEntities, entity) => ({
  ...normalizedEntities,
  [entity.id]: entity,
}), {}));

export const addReply = (entities, payload) => {
  const { comment } = payload;
  const parentComment = _.find(entities, ({ id }) => id === comment.parentId);

  const updatedParentComment = {
    ...parentComment,
    replies: [...parentComment.replies, comment.id],
  };

  return ({
    ...entities,
    [updatedParentComment.id]: updatedParentComment.id,
    [comment.id]: comment.id,
  });
};

export const addComment = (entities, { comment }) => ({
  ...entities,
  [comment.id]: comment,
});

export const addArticleComment = (articleComments, { comment }) => ([
  ...articleComments,
  comment.id,
]);

export const likeArticle = (entities, { id, likesCount, isLiked }) => ({
  ...entities,
  [id]: {
    ...entities[id],
    likes: {
      ...entities[id].likes,
      count: likesCount,
    },
    likedByReader: isLiked,
  },
});

export const commentArticle = (entities, { id, count, commented }) => ({
  ...entities,
  [id]: {
    ...entities[id],
    comments: {
      ...entities[id].comments,
      count,
    },
    commentedByReader: commented,
  },
});

const addNormalizedArticles = (entities, { payload }) => ({
  ...entities,
  ...normalizeEntities(payload.articles, entities),
});

export const entitiesReducer = handleActions({
  [GET_TOP_5_ARTICLES_FULFILLED]: addNormalizedArticles,
  [GET_NEWEST_ARTICLES_FULFILLED]: addNormalizedArticles,
  [GET_TOP_50_ARTICLES_FULFILLED]: addNormalizedArticles,
  [COMMENT_ARTICLE_FULFILLED]: (entities, { payload }) => ({
    ...entities,
    ...commentArticle(entities, payload),
  }),
  [LIKE_ARTICLE_FULFILLED]: (entities, { payload }) => ({
    ...entities,
    ...likeArticle(entities, payload),
  }),
}, initialState.entities);

export const top5Reducer = handleActions({
  [GET_TOP_5_ARTICLES_PENDING]: state => ({
    ...state,
    isFetching: true,
  }),
  [GET_TOP_5_ARTICLES_FULFILLED]: (state, { payload }) => ({
    ...state,
    byIds: payload.articles.map(article => article.id),
    isFetching: false,
  }),
  [RESET_TOP_5_ARTICLES]: () => initialState.top5,
}, initialState.top5);

export const newestReducer = handleActions({
  [GET_NEWEST_ARTICLES_PENDING]: state => ({
    ...state,
    isFetching: true,
  }),
  [GET_NEWEST_ARTICLES_FULFILLED]: (state, { payload }) => ({
    ...state,
    byIds: [...state.byIds, ...payload.articles.map(article => article.id)],
    perPage: payload.perPage,
    page: payload.page,
    count: payload.count,
    isFetching: false,
  }),
  [RESET_NEWEST_ARTICLES]: () => initialState.newest,
}, initialState.newest);

export const top50Reducer = handleActions({
  [GET_TOP_50_ARTICLES_PENDING]: state => ({
    ...state,
    isFetching: true,
  }),
  [GET_TOP_50_ARTICLES_FULFILLED]: (state, { payload }) => ({
    ...state,
    byIds: [...state.byIds, ...payload.articles.map(article => article.id)],
    isFetching: false,
  }),
  [RESET_TOP_50_ARTICLES]: () => initialState.top50,
}, initialState.newest);

export const topContributorsReducer = handleActions({
  [GET_TOP_CONTRIBUTORS_PENDING]: state => ({
    ...state,
    isFetching: true,
  }),
  [GET_TOP_CONTRIBUTORS_FULFILLED]: (state, { payload }) => ({
    ...state,
    entities: [...state.entities, ...payload.contributors],
    perPage: payload.perPage,
    page: payload.page,
    count: payload.count,
    isFetching: false,
  }),
  [RESET_TOP_CONTRIBUTORS]: () => initialState.topContributors,
}, initialState.topContributors);

export const sharingReducer = handleActions({
  [SET_ARTICLE_TO_SHARE]: (article, { payload }) => payload.articleId,
  [RESET_ARTICLE_TO_SHARE]: () => initialState.sharing,
}, initialState.sharing);

export const commentsReducer = handleActions({
  [GET_COMMENTS_FULFILLED]: (state, { payload }) => ({
    ...state,
    entities: mapCommentsToEntities(payload.comments),
    articleComments: payload.comments.map(({ id }) => id),
    isFetching: false,
  }),
  [GET_COMMENTS_PENDING]: state => ({
    ...state,
    isFetching: true,
  }),
  [SET_ARTICLE_TO_COMMENT]: (state, { payload }) => ({
    ...state,
    commenting: payload.articleId,
  }),
  [RESET_COMMENTS]: () => initialState.comments,
}, initialState.comments);

export const categoriesReducer = handleActions({
  [GET_ARTICLES_CATEGORIES_PENDING]: state => ({
    ...state,
    isFetching: true,
  }),
  [GET_ARTICLES_CATEGORIES_FULFILLED]: (state, { payload }) => ({
    ...state,
    entities: {
      ...state.entities,
      ...normalizeEntities(payload.categories),
    },
    byIds: [...state.byIds, ...payload.categories.map(category => category.id)],
    perPage: payload.perPage,
    page: payload.page,
    count: payload.count,
    sort: payload.sort,
    isFetching: false,
  }),
  [RESET_ARTICLES_CATEGORIES]: () => initialState.categories,
}, initialState.categories);

export default combineReducers({
  entities: entitiesReducer,
  top5: top5Reducer,
  newest: newestReducer,
  top50: top50Reducer,
  topContributors: topContributorsReducer,
  sharing: sharingReducer,
  comments: commentsReducer,
  categories: categoriesReducer,
});
