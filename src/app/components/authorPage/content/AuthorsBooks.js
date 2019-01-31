import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Books } from "../../../redux/actions";
import { Book } from "../../common";
import R from "ramda";
import { Link } from "react-router";

// This component currently returns random books.
// TODO: convert this to return Authors books

const styles = {
  bookImage: {
    position: "relative",
    textAlign: "center"
  },
  borderRight: {
    borderRight: "1px solid rgba(112, 112, 112, 0.5",
    paddingRight: "1.5em"
  },
  customBox: {
    maxWidth: "690px",
    padding: "1em"
  },
  bookDesc: {
    lineHeight: "1.3",
    opacity: "0.5"
  },
  litCoinsPadLeft: {
    marginLeft: "10px"
  },
  A2CButton: {
    marginTop: "1em",
    width: "100%",
    fontSize: "16px",
    backgroundColor: "#4261a5",
    fontWeight: "bold",
    padding: ".5em 1em"
  }
};

const tempConsts = {
  description:
    "This is the book or product description.  This is the book or product description.  This is the book or product description.  This is the book or product description.  This is the book or product description",
  price: "$9.99",
  litCoins: "40,500"
};

const { getBookRecommendations } = Books;

class AuthorsBooks extends PureComponent {
  componentWillMount = () => {
    this.props.getBookRecommendations(4);
  };

  renderBooks(books) {
    const truncInfo = (text, limit) => {
      return text.length >= limit ? `${text.slice(0, limit)}...` : text;
    };

    return R.take(4, books).map(book => {
      console.log(book);
      return (
        <div className="row box" style={styles.customBox}>
          <div className="small-4 columns" key={book.id}>
            <div
              data-tip
              data-for={book.slug}
              style={styles.bookImage}
              className="book-container"
            >
              <Link to={`/book/${book.slug}`}>
                <img className="book" src={book.imageUrl} />
              </Link>
            </div>
          </div>
          <div className="small-8 columns">
            <h6><strong>{book.title ? truncInfo(book.title, 40) : null}</strong></h6>
            <p style={styles.bookDesc}>
              {tempConsts.description
                ? truncInfo(tempConsts.description, 120)
                : null}
            </p>
            <div className="row">
              <div
                className="small-4 small-offset-1 large-offset-4 columns text-right"
                style={styles.borderRight}
              >
                <strong>{tempConsts.price ? tempConsts.price : null}</strong>
              </div>
              <div className="small-7 large-4 columns text-left">
                <img className="litcoin-img" src="/image/litcoin.png" />

                <strong style={styles.litCoinsPadLeft}>
                  {tempConsts.litCoins ? tempConsts.litCoins : null}
                </strong>
              </div>
            </div>
            <div className="small-12 large-7 large-offset-5 columns">
            <a href="#" className="button float-right mx-3" style={styles.A2CButton}>Add to Cart</a>
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

const mapStateToProps = ({ currentReader: { recommended } }) => {
  return { recommended };
};

export default connect(
  mapStateToProps,
  { getBookRecommendations }
)(AuthorsBooks);
