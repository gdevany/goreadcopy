import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Tiles } from "../../../redux/actions";
import { TileScroller } from "../../common";
import RefreshIndicator from "material-ui/RefreshIndicator";
import { Colors } from "../../../constants/style";
import { Link } from "react-router";
import ReactPlayer from "react-player";

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
      VideoDescLimit: 140
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
          <div className="authors-videos-like-share-box" />
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

  handleReadMoreLess = id => {
    let truncIt = this.state.isDescTrunced;
    this.setState({ isDescTrunced: !truncIt, videoIdClicked: id });
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

// const { getReadFeedTiles } = Tiles;
// const styles = {
//   refresh: {
//     display: "inline-block",
//     position: "relative"
//   }
// };

// class AuthorsVideos extends PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {
//       rf: []
//     };
//   }

//   componentWillReceiveProps(nextProps) {
//     if (this.props.readFeed !== nextProps.readFeed) {
//       this.setReadFeed(nextProps.readFeed);
//     }
//   }

//   setReadFeed = reef => {
//     console.log(this.state.rf);
//     let rf = { ...this.state.rf, rf: reef };
//     this.setState({ rf });
//   };

//   setLoading = () => {
//     return (
//       <RefreshIndicator
//         size={50}
//         left={0}
//         top={0}
//         loadingColor={Colors.blue}
//         status="loading"
//         style={styles.refresh}
//       />
//     );
//   };

//   render() {
//     const {
//       readFeed,
//       isReadFeedLocked,
//       isProfileCompleted,
//       middleContainerStyle
//     } = this.props;
//     console.log(this.state.rf);
// console.log(readFeed)
//     return (
//       <div
//         className="middle-container small-12 medium-6 columns"
//         style={middleContainerStyle}
//       >
//         <TileScroller
//           fetchTiles={params => this.props.getReadFeedTiles(params)}
//           tiles={readFeed}
//           isLocked={isReadFeedLocked}
//           fetchOnMount={true}
//           scrollPercent={0.7}
//         />
//         {isReadFeedLocked ? this.setLoading() : null}
//       </div>
//     );
//   }
// }

// const mapStateToProps = ({
//   currentReader: { isProfileCompleted, achievements },
//   tiles: { readFeed, isReadFeedLocked }
// }) => {
//   return {
//     readFeed,
//     isReadFeedLocked,
//     isProfileCompleted,
//     achievements
//   };
// };

// export default connect(
//   mapStateToProps,
//   {
//     getReadFeedTiles
//   }
// )(AuthorsVideos);
