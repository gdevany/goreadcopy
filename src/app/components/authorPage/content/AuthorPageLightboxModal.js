import React, { PureComponent } from "react";
import Dialog from "material-ui/Dialog";
import { mobileModalStyles } from "./AuthorPageModalStyling";

class AuthorPageLightboxModal extends PureComponent {
  render() {
    const { mobileContentStyle } = mobileModalStyles;
    return !this.props.payload ? null : (
      <div>
        <Dialog
          bodyClassName="addPhotoAlbumMobileModal-modalDialogBox"
          modal={false}
          open={this.props.open}
          paperClassName="addPhotoAlbumMobileModal-modalPaper"
          onRequestClose={this.props.handleModalClose}
          contentStyle={mobileContentStyle}
          autoScrollBodyContent={true}
        >
          <img
            className="authors-photos-img"
            src={this.props.payload.image}
            alt={`album image ${this.props.payload.id}`}
          />
        </Dialog>
      </div>
    );
  }
}

export default AuthorPageLightboxModal;
