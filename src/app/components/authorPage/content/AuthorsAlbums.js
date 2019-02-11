import React, { PureComponent } from "react";
import AuthorsAlbum from "./AuthorsAlbum";

//NOTE !! : AuthorPageContent (switch) default changed to AuhorsPagePhotos
//NOTE !! : Change default back to AuthorPageWall

const temp = {
  albums: [
    {
      id: 1,
      poster: "https://picsum.photos/640/480/?random",
      title: "Long Title Ellipsis Effect For This Awesome Vacation",
      desc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec sollicitudin risus. Phasellus rutrum blandit faucibus. Mauris porta, dolor quis vehicula hendrerit, est massa sollicitudin magna, ac congue sem ipsum.",
      content: [
        {
          id: 1.1,
          image: "https://picsum.photos/640/480/?random"
        },
        {
          id: 1.2,
          image: "https://picsum.photos/640/480/?random"
        },
        {
          id: 1.3,
          image: "https://picsum.photos/640/480/?random"
        },
        {
          id: 1.4,
          image: "https://picsum.photos/640/480/?random"
        }
      ]
    },
    {
      id: 2,
      poster: "https://picsum.photos/480/600/?random",
      title: "Awesome Vacation2",
      desc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec sollicitudin risus. Phasellus rutrum blandit faucibus. Mauris porta, dolor quis vehicula hendrerit, est massa sollicitudin magna, ac congue sem ipsum.",
      content: [
        {
          id: 2.1,
          image: "https://picsum.photos/480/600/?random"
        },
        {
          id: 2.2,
          image: "https://picsum.photos/480/600/?random"
        },
        {
          id: 2.3,
          image: "https://picsum.photos/480/600/?random"
        },
        {
          id: 2.4,
          image: "https://picsum.photos/480/600/?random"
        }
      ]
    },
    {
      id: 3,
      poster: "https://picsum.photos/300/?random",
      title: "Awesome Vacation3",
      desc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec sollicitudin risus. Phasellus rutrum blandit faucibus. Mauris porta, dolor quis vehicula hendrerit, est massa sollicitudin magna, ac congue sem ipsum.",
      content: [
        {
          id: 3.1,
          image: "https://picsum.photos/300/?random"
        },
        {
          id: 3.2,
          image: "https://picsum.photos/300/?random"
        },
        {
          id: 3.3,
          image: "https://picsum.photos/300/?random"
        },
        {
          id: 3.4,
          image: "https://picsum.photos/300/?random"
        }
      ]
    },
    {
      id: 4,
      poster: "https://picsum.photos/200/300/?random",
      title: "Awesome Vacation4",
      desc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec sollicitudin risus. Phasellus rutrum blandit faucibus. Mauris porta, dolor quis vehicula hendrerit, est massa sollicitudin magna, ac congue sem ipsum.",
      content: [
        {
          id: 4.1,
          image: "https://picsum.photos/200/300/?random"
        },
        {
          id: 4.2,
          image: "https://picsum.photos/200/300/?random"
        },
        {
          id: 4.3,
          image: "https://picsum.photos/200/300/?random"
        },
        {
          id: 4.4,
          image: "https://picsum.photos/200/300/?random"
        }
      ]
    }
  ]
};

class AuthorsAlbums extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isAlbumSelected: false,
      albumSelected: []
    };
  }
  renderAlbums = () => {
    let mapAlbums = temp.albums.map(album => {
      return (
        <div
          className="authors-albums-poster small-6 columns"
          key={album.id}
          onClick={e => this.renderAlbumSelected(album, e)}
        >
          <img
            className="authors-albums-img"
            src={album.poster}
            alt="album poster"
          />
          <div className="authors-albums-title-wrapper text-left">
            <div className="authors-albums-AlbumsTitle">{album.title}</div>
            <div className="authors-albums-AlbumsItems">
              {album.content.length}
              {" items"}
            </div>
          </div>
        </div>
      );
    });
    return mapAlbums;
  };

  renderAlbumSelected = (album, e) => {
    e.preventDefault();
    this.setState(prevState => ({
      isAlbumSelected: !prevState.isAlbumSelected,
      albumSelected: [...this.state.albumSelected, album]
    }));
  };

  render() {
    return (
      <div className="authors-albums-wrapper row">
        {this.state.isAlbumSelected ? (
          <AuthorsAlbum album={this.state.albumSelected[0]} />
        ) : (
          <div>{this.renderAlbums()}</div>
        )}
      </div>
    );
  }
}

export default AuthorsAlbums;
