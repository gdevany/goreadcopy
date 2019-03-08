import React, { PureComponent } from "react";

class AddPhotoAlbumMobileButton extends PureComponent {
  openAddAlbumPhotosModal = (pORa, e) => {
    e.preventDefault();
    this.props.handleMobileModalOpen(pORa, e);
  };

  render() {
    const { photosORalbumLabel, addPhotoOrAlbum } = this.props;
    return (
      <div
        className="show-for-small-only add-photo-album-mobile-button-imgBox small-6 medium-4 large-3 columns"
        onClick={e => this.openAddAlbumPhotosModal(addPhotoOrAlbum, e)}
      >
        <div className="add-photo-album-mobile-button-img  add-photo-album-mobile-button-addAlbumPhotosMobileButton">
          <div className="add-photo-album-mobile-button-plusSign">+</div>
          <div>{photosORalbumLabel}</div>
        </div>
      </div>
    );
  }
}

export default AddPhotoAlbumMobileButton;
