import React, { PureComponent } from "react";
import ReactPlayer from "react-player";
import AddVideoModal from './AddVideoModal';
import AddVideoMobileModal from './AddVideoMobileModal';


//NOTE !! : AuthorPageContent (switch) default changed to AuhorsPageVideos
//NOTE !! : Change default back to AuthorPageWall

// NOTE: code for like/comment/share pulled in from TileDefault.js
// TODO: convert icons for like/comment/share from react-player to material-ui

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
      isUserLoggedIn: true,
      commented: true,
      commentedCount: 0,
      sharedCount: 0,
      openModal: false,
      openMobileModal: false
    };
  }

  renderAddVideoButton = () => {
    const allowUserToAdd = this.state.isUserLoggedIn && (
      <reactFragment>
        <button
          className="authors-videos-addVideoButton text-center"
          onClick={e => {
            this.handleModalOpen(e);
          }}
        >
          Add Video
        </button>
      </reactFragment>
    );
    return allowUserToAdd;
  };

  renderVideos = () => {
    let videos = temps.videos.map(video => {
      return (
        <div className="authors-videos-box small-12" key={video.id}>
          <div className="authors-videos-iframe-container">
            <ReactPlayer
              className="authors-videos-player"
              url={video.videoURL}
              // light={true}
            />
          </div>
          <div className="authors-videos-title">{video.title}</div>
          <p className="authors-videos-desc">
            {this.renderVideoDesc(video, this.state.VideoDescLimit)}
          </p>
          <div className="authors-videos-likeShareBoxBorder" />
          <div>{this.renderLikesCommentsShare()}</div>
        </div>
      );
    });
    return videos;
  };

  renderVideoDesc = (video, limit) => {
    const { isDescTrunced, videoIdClicked } = this.state;
    const { desc, id } = video;
    return desc.length < limit ? (
      desc
    ) : (
      <reactFragment>
        <span className="authors-page-lighten">
          {videoIdClicked === id && isDescTrunced !== true
            ? desc
            : this.truncInfo(desc, limit)}
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
      <div className="authors-videos-socialWrapper row">
        <div className="small-4 columns text-left">
          <div className="likes-count">
            <a
              onClick={
                this.state.isUserLoggedIn //TODO
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
        <div className="small-4 columns text-center">
          <div className="comments-count">
            <a
              onClick={
                this.state.isUserLoggedIn
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
        <div className="small-4 columns text-right">
          <div className="shared-count">
            {/* <a onClick={this.handleShareOpen}> */}
            <span className="share" ref="share">
              Share {sharedCount}
            </span>
            {/* </a> */}
          </div>
        </div>
      </div>
    );
  };

  handleAddVideoModal = () => {
    return (
      <reactFragment>
        <AddVideoModal
          addPhotoOrAlbum={this.state.addPhotoOrAlbum}
          handleModalClose={this.handleModalClose}
          open={this.state.openModal}
        />
        {/* <AddVideoMobileModal
          addPhotoOrAlbum={this.state.addPhotoOrAlbum}
          handleModalClose={this.handleModalClose}
          open={this.state.openMobileModal}
        /> */}
      </reactFragment>
    );

  }

  handleModalOpen = e => {
    e.preventDefault();
    this.setState({ openModal: true });
  };

  handleMobileModalOpen = e => {
    e.preventDefault();
    this.setState({ openMobileModal: true })
  }

  handleModalClose = () => {
    this.setState({ openModal: false, openMobileModal: false })
  }

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
      <reactFragment>
        {this.handleAddVideoModal()}
        <div className="authors-videos-UserLoggedAddVideo-wrapper">
          {this.renderAddVideoButton()}
        </div>
        <div className="authors-videos-wrapperBox">{this.renderVideos()}</div>
      </reactFragment>
    );
  }
}
export default AuthorVideos;
