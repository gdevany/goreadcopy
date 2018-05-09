import { connect } from 'react-redux';
import { withBooksWithPagination } from '../hocs';
import { getTrending, resetTrending } from '../../../redux/actions/books';
import { getTrending as newReleasesSelector } from '../../../redux/selectors/books';
import BookCarousel from '../BookCarousel';


const mapDispatchToProps = {
  fetchBooks: getTrending,
  resetBooks: resetTrending,
};

const mapStateToProps = (state) => {
  const books = newReleasesSelector(state);

  return ({
    books,
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(withBooksWithPagination(BookCarousel));
