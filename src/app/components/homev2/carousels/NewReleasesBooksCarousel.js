import { connect } from 'react-redux';
import { withBooksWithPagination } from '../hocs';
import { getNewReleases, resetNewReleases } from '../../../redux/actions/books';
import { getNewReleases as newReleasesSelector } from '../../../redux/selectors/books';
import BookCarousel from '../BookCarousel';


const mapDispatchToProps = {
  fetchBooks: getNewReleases,
  resetBooks: resetNewReleases,
};

const mapStateToProps = (state) => {
  const books = newReleasesSelector(state);

  return ({
    books,
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(withBooksWithPagination(BookCarousel));
