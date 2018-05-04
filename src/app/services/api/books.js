import http from '../http';
import { Endpoints } from '../../constants';

const {
  books,
  filterBooks,
  getBooksCategories,
  getHomeBestSellingBooks,
  getHomeTrendingBooks,
  getHomeNewReleaseBooks,
  getHomeComingSoonBooks,
} = Endpoints;

const Books = () => ({
  getBooks: params => http.get(books(params)),
  filterBooks: params => http.get(filterBooks(params)),
  getCategories: params => http.get(getBooksCategories(params)),
  getBestSellers: params => http.get(getHomeBestSellingBooks(params)),
  getNewReleases: params => http.get(getHomeNewReleaseBooks(params)),
  getComingSoon: params => http.get(getHomeComingSoonBooks(params)),
  getTrending: params => http.get(getHomeTrendingBooks(params)),
});

export default Books();
