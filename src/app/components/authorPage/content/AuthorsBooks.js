import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Books } from "../../../redux/actions";
import R from "ramda";
import { Link } from "react-router";

const { getBookRecommendations } = Books;

// This component currently returns random books.
// TODO: convert this to return Authors books

const tempConsts = {
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sollicitudin nunc non quam sollicitudin, nec facilisis libero gravida. Aenean faucibus, urna et aliquam laoreet, arcu est sodales odio, et gravida lorem lorem ultricies nisl. Suspendisse lacinia nulla tellus, at iaculis ante bibendum efficitur.",
  price: "$9.99",
  litCoins: "40,500"
};

class AuthorsBooks extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      bookTitleLimit: 40,
      bookDescLimit: 100,
      isDescTrunced: true,
      bookIdClicked: 0
    };
  }

  componentDidMount = () => {
    this.props.getBookRecommendations(4);
  };

  renderBooks(books) {
    const { bookTitleLimit } = this.state;
    return R.take(4, books).map(book => {
      return (
        <div className="authors-books-wrapper" key={book.id}>
          <div className="small-4 columns" key={book.id}>
            <div
              data-tip
              data-for={book.slug}
              className="authors-books-bookImage"
            >
              <Link to={`/book/${book.slug}`}>
                <img className="book" src={book.imageUrl} />
              </Link>
            </div>
          </div>
          <div className="small-8 columns authors-books-bookInfo-wrapper">
            <div className="authors-books-book-title">
              {book.title
                ? this.handleTruncInfo(book.title, bookTitleLimit)
                : null}
            </div>
            <p className="authors-books-bookDesc">
              {tempConsts.description
                ? this.renderBookDesc(tempConsts.description, book.id)
                : null}
            </p>
            <div className="authors-books-price-wrapper">
              <div className="authors-books-priceLine">
                <div className="authors-books-borderRight">
                  <strong>{tempConsts.price ? tempConsts.price : null}</strong>
                </div>
                <div>
                  <img
                    className="authors-page-litcoin-img"
                    src="/image/litcoin.png"
                  />
                  <strong>
                    {tempConsts.litCoins ? tempConsts.litCoins : null}
                  </strong>
                </div>
              </div>
              <div className="authors-books-a2cButton-wrapper">
                <button href="#" className="authors-books-a2cButton">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  renderBookDesc = (text, id) => {
    const { bookDescLimit, isDescTrunced, bookIdClicked } = this.state;
    return text.length < bookDescLimit ? (
      text
    ) : (
      <reactFragment>
        <span className="authors-books-lighten">
          {bookIdClicked === id && isDescTrunced !== true
            ? text
            : this.handleTruncInfo(text, bookDescLimit)}
        </span>
        <a
          className="authors-books-a-span"
          onClick={() => this.handleReadMoreLess(id)}
        >
          {bookIdClicked === id && isDescTrunced !== true ? (
            <span>Read less</span>
          ) : (
            <span>Read more</span>
          )}
        </a>
      </reactFragment>
    );
  };

  handleReadMoreLess = id => {
    let truncIt = this.state.isDescTrunced;
    this.setState({ isDescTrunced: !truncIt, bookIdClicked: id });
  };

  handleTruncInfo = (text, limit) => {
    return text.length >= limit ? `${text.slice(0, limit)}...` : text;
  };

  render() {
    const { recommended } = this.props;
    const books = recommended ? recommended.books : null;

    return (
      <reactFragment>
        {books ? (
          this.renderBooks(books)
        ) : (
          <div className="loading-animation" />
        )}
      </reactFragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    recommended: state.currentReader.recommended
  };
};

const mapDispatchToProps = { getBookRecommendations };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorsBooks);
