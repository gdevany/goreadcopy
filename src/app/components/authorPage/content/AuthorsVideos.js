import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import ReactPlayer from "react-player";
import { Colors } from "../../../constants/style";
import { Card, CardActions } from "material-ui";

// TODO: restructure once new endpoint completed
// TODO: cleanup and move styles to scss
//   -note: may need some of this unused styles once restructured
//   -note: code for like/comment/share pulled in from TileDefault.js
// TODO: convert icons for like/comment/share from react-player to material-ui

const styles = {
  popover: {
    borderRadius: 9,
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 20px"
  },
  headerContainer: {
    padding: 30,
    textAlign: "left"
  },
  commentHeaderContainer: {
    padding: "30px 30px 15px",
    textAlign: "left"
  },
  card: {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 20px"
  },
  nameText: {
    color: Colors.blue,
    display: "inline",
    fontSize: 14,
    fontWeight: 600
  },
  postText: {
    color: Colors.black,
    display: "inline",
    marginLeft: 6,
    marginRight: 0
  },
  commentTimeStamp: {
    display: "inline",
    marginLeft: 10
  },
  timeStamp: {
    fontSize: 14,
    color: Colors.grey,
    position: "absolute",
    left: 85,
    top: 53
  },
  textContainer: {
    marginTop: -5,
    paddingRight: 40
  },
  contentContainer: {
    padding: "0 30px 30px 30px"
  },
  socialContainer: {
    margin: 0
  },
  socialWrapper: {
    borderTop: "2px solid #F4F4F4",
    fontSize: 14,
    opacity: "100",
    padding: "20px 30px"
  },
  commentIconContainer: {
    textAlign: "center"
  },
  commentContainer: {
    borderTop: "2px solid #F4F4F4",
    opacity: "100",
    padding: 0
  },
  commentActions: {
    borderBottom: "2px solid #F4F4F4",
    fontSize: 14,
    opacity: "100",
    padding: "10px 20px"
  },
  likesContainer: {
    textAlign: "left",
    padding: 0
  },
  shareContainer: {
    textAlign: "right",
    padding: 0
  },
  sharePopover: {
    margin: 0,
    padding: 20,
    listStyle: "none"
  },
  shareLink: {
    marginBottom: 10
  },
  shareButton: {
    margin: "0 auto"
  },
  shareGoReadLink: {
    margin: 0
  },
  commentCard: {
    boxShadow: "none"
  },
  commentContent: {
    padding: "0 30px",
    marginLeft: 54,
    textAlign: "justify"
  },
  postButton: {
    float: "right",
    marginRight: 35
  },
  cardContainer: {
    borderRadius: 5,
    boxShadow: "rgba(222, 222, 222, 0.5) 0px 4px 20px 0px"
  },
  postInput: {
    border: "1px solid #F4F4F4",
    borderRadius: 3,
    opacity: "100",
    outline: "none",
    marginLeft: 85,
    maxWidth: 450
  },
  childCommentContainer: {
    marginLeft: 40
  },
  childCommentActionContainer: {
    textAlign: "right",
    padding: "0px 10px"
  },
  childCommentHeaderContainer: {
    padding: "20px 20px 15px",
    textAlign: "left"
  },
  refresh: {
    display: "inline-block",
    position: "relative"
  }
};

const temps = {
  videos: [
    {
      id: 1,
      videoURL: "https://vimeo.com/6363388",
      title: "Test Video",
      desc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pretium ex non tellus sodales, non vestibulum nibh vestibulum. Sed quis libero quam. Suspendisse magna purus, pulvinar ac vehicula et, mollis et ante. Nunc a elit in est hendrerit sodales vel quis eros. Proin ac tincidunt libero. Nunc ut tincidunt diam. Praesent vel massa at mauris sollicitudin ornare non eget quam. Pellentesque at viverra mauris. Donec ultrices placerat lorem vel aliquam. Nullam sed gravida ligula. Vestibulum vel viverra dolor."
    },
    {
      id: 2,
      videoURL: "https://youtu.be/C0DPdy98e4c",
      title: "Test Video",
      desc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pretium ex non tellus sodales, non vestibulum nibh vestibulum. Sed quis libero quam. Suspendisse magna purus, pulvinar ac vehicula et, mollis et ante. Nunc a elit in est hendrerit sodales vel quis eros. Proin ac tincidunt libero. Nunc ut tincidunt diam. Praesent vel massa at mauris sollicitudin ornare non eget quam. Pellentesque at viverra mauris. Donec ultrices placerat lorem vel aliquam. Nullam sed gravida ligula. Vestibulum vel viverra dolor."
    },
    {
      id: 3,
      videoURL: "https://youtu.be/EngW7tLk6R8",
      title: "Test Video",
      desc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pretium ex non tellus sodales, non vestibulum nibh vestibulum. Sed quis libero quam. Suspendisse magna purus, pulvinar ac vehicula et, mollis et ante. Nunc a elit in est hendrerit sodales vel quis eros. Proin ac tincidunt libero. Nunc ut tincidunt diam. Praesent vel massa at mauris sollicitudin ornare non eget quam. Pellentesque at viverra mauris. Donec ultrices placerat lorem vel aliquam. Nullam sed gravida ligula. Vestibulum vel viverra dolor."
    },
    {
      id: 4,
      videoURL: "https://youtu.be/ScMzIvxBSi4",
      title: "Test Video",
      desc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pretium ex non tellus sodales, non vestibulum nibh vestibulum. Sed quis libero quam. Suspendisse magna purus, pulvinar ac vehicula et, mollis et ante. Nunc a elit in est hendrerit sodales vel quis eros. Proin ac tincidunt libero. Nunc ut tincidunt diam. Praesent vel massa at mauris sollicitudin ornare non eget quam. Pellentesque at viverra mauris. Donec ultrices placerat lorem vel aliquam. Nullam sed gravida ligula. Vestibulum vel viverra dolor."
    }
  ]
};

class AuthorVideos extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isDescTrunced: true,
      videoIdClicked: 0,
      VideoDescLimit: 140,
      liked: 0,
      likedCount: 0,
      userLogged: true,
      commented: true,
      commentedCount: 0,
      sharedCount: 0
    };
  }

  renderVideos = () => {
    let videos = temps.videos.map(video => {
      return (
        <div className="authors-videos-box small-12" key={video.id}>
          <div className="authors-videos-iframe-container">
            <ReactPlayer
              className="authors-videos-player"
              url={video.videoURL}
              light={true}
            />
          </div>
          <h5 className="authors-videos-title">
            <strong>{video.title}</strong>
          </h5>
          <p className="authors-videos-desc">
            {this.renderVideoDesc(
              video.desc,
              this.state.VideoDescLimit,
              video.id
            )}
          </p>
          <div className="authors-videos-like-share-box">
            {this.renderLikesCommentsShare()}
          </div>
        </div>
      );
    });
    return videos;
  };

  renderVideoDesc = (text, limit, id) => {
    const { isDescTrunced, videoIdClicked } = this.state;

    return text.length < limit ? (
      text
    ) : (
      <reactFragment>
        <span className="authors-page-lighten">
          {videoIdClicked === id && isDescTrunced !== true
            ? text
            : this.truncInfo(text, limit)}
        </span>
        <a
          className="authors-videos-a-span"
          onClick={() => this.handleReadMoreLess(id)}
        >
          {videoIdClicked === id && isDescTrunced !== true ? (
            <span>{"   "}Read less</span>
          ) : (
            <span>Read more</span>
          )}
        </a>
      </reactFragment>
    );
  };

  renderLikesCommentsShare = () => {
    // Code pulled in (deconstructed) from TileDefault.js
    // TODO: modify once endpoint finished
    const {
      liked,
      likedCount,
      commented,
      commentedCount,
      sharedCount
    } = this.state;
    return (
      <Card>
        <CardActions style={styles.socialWrapper}>
          <div style={styles.socialContainer} className="row">
            <div className="small-4 columns" style={styles.likesContainer}>
              <div className="likes-count">
                <a
                  onClick={
                    this.state.userLogged //TODO
                      ? this.handleLiked
                      : // : this.handleLogInModalOpen
                        null // TODO
                  }
                  className={liked ? "liked" : "not-liked"}
                />

                <span className={liked ? "liked-number" : "not-liked-number"}>
                  {likedCount}
                </span>
              </div>
            </div>
            <div
              className="small-4 columns"
              style={styles.commentIconContainer}
            >
              <div className="comments-count">
                <a
                  onClick={
                    this.state.userLogged
                      ? // ? this.handleCommentsOpen
                        // : this.handleLogInModalOpen
                        null // TODO
                      : null // TODO
                  }
                  className={commented ? "commented" : "not-commented"}
                />

                <span
                  className={
                    commented ? "commented-number" : "not-commented-number"
                  }
                >
                  {commentedCount}
                </span>
              </div>
            </div>
            <div className="small-4 columns" style={styles.shareContainer}>
              <div className="shared-count">
                {/* <a onClick={this.handleShareOpen}> */}
                <span className="share" ref="share">
                  Share {sharedCount}
                </span>
                {/* </a> */}
              </div>
            </div>
          </div>
        </CardActions>
      </Card>
    );
  };

  handleReadMoreLess = id => {
    let truncIt = this.state.isDescTrunced;
    this.setState({ isDescTrunced: !truncIt, videoIdClicked: id });
  };

  handleLiked = () => {
    const { liked, likedCount } = this.state;
    if (liked) {
      this.setState({
        liked: false,
        likedCount: likedCount - 1
      });
    } else {
      this.setState({
        liked: true,
        likedCount: likedCount + 1
      });
      this.setState({ likedCount: likedCount + 1 });
    }
  };

  truncInfo = (text, limit) => {
    return text.length >= limit ? `${text.slice(0, limit)}...` : text;
  };

  render() {
    return (
      <div className="authors-videos-wrapperBox">{this.renderVideos()}</div>
    );
  }
}
export default AuthorVideos;
