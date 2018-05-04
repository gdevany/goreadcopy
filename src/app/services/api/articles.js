import http from '../http';
import { Endpoints } from '../../constants';
const {
  articles: {
    getArticles,
    getTopContributors,
    getTop5Articles,
    getTop50Articles,
    getNewestArticles,
    getCategories,
  },
  updateLikes,
} = Endpoints;
const { authenticated, isAuthenticated } = http;
const Articles = () => ({
  getArticles: params => http.get(getArticles(params)),
  getNewestArticles: (params) => {
    const newestArticlesURL = getNewestArticles(params);
    if (isAuthenticated()) {
      return authenticated().get(newestArticlesURL);
    }
    return http.get(newestArticlesURL);
  },
  getTopContributors: params => http.get(getTopContributors(params)),
  getCategories: params => http.get(getCategories(params)),
  getTop5Articles: () => {
    const top5ArticlesURL = getTop5Articles();
    if (isAuthenticated()) {
      return authenticated().get(top5ArticlesURL);
    }
    return http.get(top5ArticlesURL);
  },
  getTop50Articles: () => {
    const top50ArticlesURL = getTop50Articles();
    if (isAuthenticated()) {
      return authenticated().get(top50ArticlesURL);
    }
    return http.get(top50ArticlesURL);
  },
  likeArticle: (id, body) => authenticated().post(updateLikes(id), body),
});
export default Articles();
