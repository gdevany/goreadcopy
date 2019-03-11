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
          <div className="small-8 columns">
            <h6>
              <strong>
                {book.title ? this.handleTruncInfo(book.title, bookTitleLimit) : null}
              </strong>
            </h6>
            <p className="authors-books-bookDesc">
              {tempConsts.description
                ? this.renderBookDesc(tempConsts.description, book.id)
                : null}
            </p>
            <div className="row">
              <div className="small-4 small-offset-1 large-offset-4 columns authors-books-borderRight">
                <strong>{tempConsts.price ? tempConsts.price : null}</strong>
              </div>
              <div className="small-7 large-4 columns text-left">
                <img className="litcoin-img" src="/image/litcoin.png" />

                <strong className="authors-books-litCoinsPadLeft">
                  {tempConsts.litCoins ? tempConsts.litCoins : null}
                </strong>
              </div>
            </div>
            <div className="small-12 large-7 large-offset-5 columns">
              <a
                href="#"
                className="authors-books-a2cButton button float-right mx-3"
              >
                Add to Cart
              </a>
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
