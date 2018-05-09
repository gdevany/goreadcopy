import { connect } from 'react-redux';
import { withBooksWithPagination } from '../hocs';
import { getComingSoon, resetComingSoon } from '../../../redux/actions/books';
import { getComingSoon as comingSoonSelector } from '../../../redux/selectors/books';
import BookCarousel from '../BookCarousel';


const mapDispatchToProps = {
  fetchBooks: getComingSoon,
  resetBooks: resetComingSoon,
};

const mapStateToProps = (state) => {
  const books = comingSoonSelector(state);

  return ({
    books,
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(withBooksWithPagination(BookCarousel));
