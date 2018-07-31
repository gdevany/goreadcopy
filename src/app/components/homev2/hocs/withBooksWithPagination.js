import { lifecycle, withHandlers, withState, compose } from 'recompose';

const withBooksWithPagination = compose(
  withState('page', 'setPage', 1),
  withHandlers({
    onNext: props => () => {
      // #TODO: add pagination when home is deployed.
      /* const {
        fetchBooks,
        setPage,
        page,
        perPage,
        books,
        limit,
      } = props;
      const nextPage = page + 1;

      if (books.length >= limit) {
        return;
      }

      fetchBooks(nextPage, perPage);
      setPage(nextPage);
      */
    },
    onPrevious: () => () => {},
  }),
  lifecycle({
    componentWillMount() {
      const {
        fetchBooks,
        perPage,
        page,
        setPage,
        maxPrice,
        onStock,
        oneByFamily,
      } = this.props;

      fetchBooks({
          page,
          perPage,
          maxPrice,
          onStock,
          oneByFamily});
      setPage(page + 1);
    },
    componentWillUnmount() {
      this.props.resetBooks();
    },
  }),
);

export default withBooksWithPagination;
