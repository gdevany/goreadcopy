import { createAction } from 'redux-actions';
import { ARTICLES as A } from '../const/actionTypes';
import ArticlesAPI from '../../services/api/articles';
import ReaderTilesAPI from '../../services/api/tiles';

export const getTop5Articles = createAction(A.GET_TOP_5_ARTICLES, () => (
  new Promise((resolve, reject) => (
    ArticlesAPI.getTop5Articles()
      .then(({ data }) => resolve({ articles: data }))
      .catch(err => reject(err))
  ))
));

export const getNewestArticles = createAction(A.GET_NEWEST_ARTICLES, (page = 1, perPage = 10) => (
  new Promise((resolve, reject) => (
    ArticlesAPI.getNewestArticles({ page, perPage })
      .then(({ data }) => resolve({
        articles: data.results,
        page: data.page,
        perPage: data.perPage,
        count: data.count,
      }))
      .catch(err => reject(err))
  ))
));

export const getTop50Articles = createAction(A.GET_TOP_50_ARTICLES, (page = 1, perPage = 10) => (
  new Promise((resolve, reject) => (
    ArticlesAPI.getTop50Articles({ page, perPage })
      .then(({ data }) => resolve({
        articles: data.results,
        page: data.page,
        perPage: data.perPage,
        count: data.count,
      }))
      .catch(err => reject(err))
  ))
));

export const getTopContributors = createAction(A.GET_TOP_CONTRIBUTORS, (page = 1, perPage = 10) => (
  new Promise((resolve, reject) => (
    ArticlesAPI.getTopContributors({ page, perPage })
      .then(({ data }) => resolve({
        contributors: data.results,
        page: data.page,
        perPage: data.perPage,
        count: data.count,
      }))
      .catch(err => reject(err))
  ))
));

export const getCategories = createAction(A.GET_ARTICLES_CATEGORIES, () => (
  new Promise((resolve, reject) => (
    ArticlesAPI.getCategories()
      .then(({ data }) => resolve({
        categories: data.categories,
      }))
      .catch(err => reject(err))
  ))
));

export const resetArticlesCategories = createAction(A.RESET_ARTICLES_CATEGORIES);

export const likeArticle = createAction(A.LIKE_ARTICLE, id => (
  new Promise((resolve, reject) => (
    ArticlesAPI.likeArticle(id)
      .then(({ data }) => resolve({
        id,
        isLiked: data.liked,
        likesCount: data.likesCount,
      }))
      .catch(err => reject(err))
  ))
));

export const postComment = createAction(A.COMMENT_ARTICLE, (activityId, comment, parentId, mentions, datetime, profile) => (
  new Promise((resolve, reject) => {
    ReaderTilesAPI.updateComments(activityId, { comment, parentId, mentions })
      .then(({ data }) => {
        resolve({
          id: activityId,
          comment: {
            id: data.commentId,
            parentId,
            datetime,
            mentions,
            profile,
          },
          count: data.commentsCount,
          commented: data.commented,
        });
      })
      .catch(error => reject(error));
  })
));

export const getComments = createAction(A.GET_COMMENTS, (activityId, page) => (
  new Promise((resolve, reject) => (
    ReaderTilesAPI.getComments(activityId, { page })
      .then(({ data }) => resolve({
        comments: data.results,
      }))
      .catch(err => reject(err))
  ))
));

export const setArticleToShare = createAction(A.SET_ARTICLE_TO_SHARE, articleId => ({ articleId }));
export const resetArticleToShare = createAction(A.RESET_ARTICLE_TO_SHARE);

export const setArticleToComment = createAction(A.SET_ARTICLE_TO_COMMENT, articleId => ({ articleId }));
export const resetComments = createAction(A.RESET_COMMENTS);

export const maybeLikeArticleFactory = ({
  whenNotLikedActionCreator = () => {},
  isAuthenticatedSelector = () => {},
} = {}) => (
  id => (
    (dispatch, getState) => {
      const state = getState();
      const isAuthenticated = isAuthenticatedSelector(state);

      return isAuthenticated ? dispatch(likeArticle(id)) : dispatch(whenNotLikedActionCreator());
    }
  )
);
