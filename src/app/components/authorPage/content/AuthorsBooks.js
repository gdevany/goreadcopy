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
    borderRight: "1px solid #707070",
    opacity: "0.5"
  },
  customBox: {
    maxWidth: "50%"
  }
};

const tempConsts = {
  description:
    "aaaaaaa bbbbbbbb cccccccc ddddddddd eeeeeeeee fffffffff ggggggg hhhhhhhhh iiiiiiiiiiii jjjjjjjjj kkkkkkkkk llllllllll mmmmmmmmm nnnnnnnnnn oooooooo pppppppppp qqqqqqqqqq rrrrrrrr sssssssssss tttttttttt uuuuuuuuuu vvvvvvvvvv",
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
            <h6><strong>{book.title ? truncInfo(book.title, 30) : null}</strong></h6>
            <p>
              {tempConsts.description
                ? truncInfo(tempConsts.description, 60)
                : null}
            </p>
            <div className="row">
              <div
                className="small-4 small-offset-2 columns text-right"
                style={styles.borderRight}
              >
                <strong>{tempConsts.price ? tempConsts.price : null}</strong>
              </div>
              <div className="small-6 columns text-left">
                <img className="litcoin-img" src="/image/litcoin.png" />

                <strong>
                  {tempConsts.litCoins ? tempConsts.litCoins : null}
                </strong>
              </div>
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
