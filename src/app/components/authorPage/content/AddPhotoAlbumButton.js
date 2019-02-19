import React, { PureComponent } from "react";

class AddPhotoAlbumButton extends PureComponent {
  openAddAlbumPhotosModal = (pORa, e) => {
    e.preventDefault();
    // alert("TODO: create openAddAlbumPhotosModal");
    this.props.handleModalOpen(pORa,e)
  };

  render() {
    const { photosORalbumLabel, addPhotoOrAlbum } = this.props;
    return (
      <div
        className="show-for-small-only add-photo-album-button-imgBox small-6 medium-4 large-3 columns"
        onClick={e => this.openAddAlbumPhotosModal(addPhotoOrAlbum,e)}
      >
        <div className="add-photo-album-button-img  add-photo-album-button-addAlbumPhotosMobileButton">
          <div className="add-photo-album-button-plusSign">+</div>
          <div>{photosORalbumLabel}</div>
        </div>
      </div>
    );
  }
}

export default AddPhotoAlbumButton;
