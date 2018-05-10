import { connect } from 'react-redux';
import { withBooksWithPagination } from '../hocs';
import { getBestSellers, resetBestSellers } from '../../../redux/actions/books';
import { getBestSellers as bestSellersSelector } from '../../../redux/selectors/books';
import BookCarousel from '../BookCarousel';


const mapDispatchToProps = {
  fetchBooks: getBestSellers,
  resetBooks: resetBestSellers,
};

const mapStateToProps = (state) => {
  const books = bestSellersSelector(state);

  return ({
    books,
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(withBooksWithPagination(BookCarousel));
