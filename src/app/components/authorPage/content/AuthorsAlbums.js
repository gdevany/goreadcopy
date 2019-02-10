import React, { PureComponent } from "react";

const temp = {
  albums: [
    {
      id: 1,
      poster: "https://placeimg.com/640/480/animals",
      title: "Long Title Ellipsis Effect For This Awesome Vacation",
      content: [
        {
          id: 1.1,
          image: "https://placeimg.com/640/480/animals"
        },
        {
          id: 1.2,
          image: "https://placeimg.com/640/480/architecture"
        },
        {
          id: 1.3,
          image: "https://placeimg.com/640/480/nature"
        },
        {
          id: 1.4,
          image: "https://placeimg.com/640/480/people"
        }
      ]
    },
    {
      id: 2,
      poster: "https://placeimg.com/640/480/architecture",
      title: "Awesome Vacation2",
      content: [
        {
          id: 2.1,
          image: "https://placeimg.com/640/480/animals"
        },
        {
          id: 2.2,
          image: "https://placeimg.com/640/480/architecture"
        },
        {
          id: 2.3,
          image: "https://placeimg.com/640/480/nature"
        },
        {
          id: 2.4,
          image: "https://placeimg.com/640/480/people"
        }
      ]
    },
    {
      id: 3,
      poster: "https://placeimg.com/640/480/nature",
      title: "Awesome Vacation3",
      content: [
        {
          id: 3.1,
          image: "https://placeimg.com/640/480/animals"
        },
        {
          id: 3.2,
          image: "https://placeimg.com/640/480/architecture"
        },
        {
          id: 3.3,
          image: "https://placeimg.com/640/480/nature"
        },
        {
          id: 3.4,
          image: "https://placeimg.com/640/480/people"
        }
      ]
    },
    {
      id: 4,
      poster: "https://placeimg.com/640/480/people",
      title: "Awesome Vacation4",
      content: [
        {
          id: 4.1,
          image: "https://placeimg.com/640/480/animals"
        },
        {
          id: 4.2,
          image: "https://placeimg.com/640/480/architecture"
        },
        {
          id: 4.3,
          image: "https://placeimg.com/640/480/nature"
        },
        {
          id: 4.4,
          image: "https://placeimg.com/640/480/people"
        }
      ]
    }
  ]
};

class AuthorsAlbums extends PureComponent {
  renderAlbums = () => {
    let mapAlbums = temp.albums.map(album => {
      return (
        <div className="authors-albums-poster small-6 columns" key={album.id}>
          <img src={album.poster} alt="album poster" />
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

  render() {
    return <div className="authors-albums-wrapper">{this.renderAlbums()}</div>;
  }
}

export default AuthorsAlbums;
