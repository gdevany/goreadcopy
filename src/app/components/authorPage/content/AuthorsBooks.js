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
  componentDidMount = () => {
    this.props.getBookRecommendations(4);
  };

  renderBooks(books) {
    const truncInfo = (text, limit) => {
      return text.length >= limit ? `${text.slice(0, limit)}...` : text;
    };

    return R.take(4, books).map(book => {
      console.log(book);
      return (
        <div className="row box customBox" key={book.id}>
          <div className="small-4 columns" key={book.id}>
            <div
              data-tip
              data-for={book.slug}
              className="bookImage book-container"
            >
              <Link to={`/book/${book.slug}`}>
                <img className="book" src={book.imageUrl} />
              </Link>
            </div>
          </div>
          <div className="small-8 columns">
            <h6>
              <strong>{book.title ? truncInfo(book.title, 40) : null}</strong>
            </h6>
            <p className="bookDesc">
              {tempConsts.description
                ? truncInfo(tempConsts.description, 120)
                : null}
            </p>
            <div className="row">
              <div className="small-4 small-offset-1 large-offset-4 columns text-right border-right">
                <strong>{tempConsts.price ? tempConsts.price : null}</strong>
              </div>
              <div className="small-7 large-4 columns text-left">
                <img className="litcoin-img" src="/image/litcoin.png" />

                <strong className="litCoinsPadLeft">
                  {tempConsts.litCoins ? tempConsts.litCoins : null}
                </strong>
              </div>
            </div>
            <div className="small-12 large-7 large-offset-5 columns">
              <a href="#" className="a2cButton button float-right mx-3">
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
      <div className="container authors-books">
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
