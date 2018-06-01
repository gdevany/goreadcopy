import http from '../http';
import { Endpoints } from '../../constants';

const { authenticated, isAuthenticated } = http;
const { searchData, searchBooksData } = Endpoints;

const requestGetBySession = (url) => {
  if (isAuthenticated()) {
    return authenticated().get(url);
  }
  return http.get(url);
};

const Search = () => ({
  search: body => http.get(searchData(body)),
  searchBooks: body => requestGetBySession(searchBooksData(body)),
});

export default Search();
