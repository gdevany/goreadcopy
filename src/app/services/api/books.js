import http from '../http';
import { Endpoints } from '../../constants';

const {
  books,
  filterBooks,
  getHomeBestSellingBooks,
  getHomeTrendingBooks,
  getHomeNewReleaseBooks,
  getHomeComingSoonBooks,
} = Endpoints;

const Books = () => ({
  getBooks: params => http.get(books(params)),
  filterBooks: params => http.get(filterBooks(params)),
  getBestSellers: params => http.get(getHomeBestSellingBooks(params)),
  getHomeBestSellingBooks: params => http.get(getHomeBestSellingBooks(params)),
  getHomeTrendingBooks: params => http.get(getHomeTrendingBooks(params)),
  getHomeNewReleaseBooks: params => http.get(getHomeNewReleaseBooks(params)),
  getHomeComingSoonBooks: params => http.get(getHomeComingSoonBooks(params)),
});

export default Books();
