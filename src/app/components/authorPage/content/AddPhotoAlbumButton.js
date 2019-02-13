import React, { PureComponent } from "react";

class AddPhotoAlbumButton extends PureComponent {
  openAddAlbumPhotosModal = e => {
    e.preventDefault();
    alert("TODO: create openAddAlbumPhotosModal");
  };

  render() {
    return (
      <div
        className="show-for-small-only add-photo-album-button-imgBox small-6 medium-4 large-3 columns"
        onClick={e => this.openAddAlbumPhotosModal(e)}
      >
        <div className="add-photo-album-button-img  add-photo-album-button-addAlbumPhotosMobileButton">
          <div className="add-photo-album-button-plusSign">+</div>
          <div>{this.props.photosORalbum}</div>
        </div>
      </div>
    );
  }
}

export default AddPhotoAlbumButton;
