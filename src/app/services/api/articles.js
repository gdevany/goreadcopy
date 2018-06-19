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

const requestGetBySession = (url) => {
  if (isAuthenticated()) {
    return authenticated().get(url);
  }
  return http.get(url);
};

const Articles = () => ({
  getArticles: params => http.get(getArticles(params)),
  getNewestArticles: params => requestGetBySession(getNewestArticles(params)),
  getTopContributors: params => http.get(getTopContributors(params)),
  getCategories: params => http.get(getCategories(params)),
  getTop5Articles: () => requestGetBySession(getTop5Articles()),
  getTop50Articles: () => requestGetBySession(getTop50Articles()),
  likeArticle: (id, body) => authenticated().post(updateLikes(id), body),
});

export default Articles();
