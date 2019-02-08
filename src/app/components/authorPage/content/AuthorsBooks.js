import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Books } from "../../../redux/actions";
import R from "ramda";
import { Link } from "react-router";

//NOTE !! : AuthorPageContent (switch) default changed to AuhorsPageStore
//NOTE !! : Change default back to AuthorPageWall

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

  renderBookDesc = (text, id) => {
    const { bookDescLimit, isDescTrunced, bookIdClicked } = this.state;

    return text.length < bookDescLimit ? (
      text
    ) : (
      <reactFragment>
        <span className="authors-books-lighten">
          {bookIdClicked === id && isDescTrunced !== true
            ? text
            : this.truncInfo(text, bookDescLimit)}
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

  truncInfo = (text, limit) => {
    return text.length >= limit ? `${text.slice(0, limit)}...` : text;
  };

  renderBooks(books) {
    const { bookTitleLimit } = this.state;
    return R.take(4, books).map(book => {
      return (
        <div className="row box authors-books-wrapperBox" key={book.id}>
          <div className="small-4 columns" key={book.id}>
            <div
              data-tip
              data-for={book.slug}
              className="authors-books-bookImage book-container"
            >
              <Link to={`/book/${book.slug}`}>
                <img className="book" src={book.imageUrl} />
              </Link>
            </div>
          </div>
          <div className="small-8 columns">
            <h6>
              <strong>
                {book.title ? this.truncInfo(book.title, bookTitleLimit) : null}
              </strong>
            </h6>
            <p className="authors-books-bookDesc">
              {tempConsts.description
                ? this.renderBookDesc(tempConsts.description, book.id)
                : null}
            </p>
            <div className="row">
              <div className="small-4 small-offset-1 large-offset-4 columns text-right authors-books-borderRight">
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

  render() {
    const { recommended } = this.props;
    const books = recommended ? recommended.books : null;

    return (
      <div className="container">
        {books ? (
          this.renderBooks(books)
        ) : (
          <div className="loading-animation" />
        )}
      </div>
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
