import React, { PureComponent } from "react";
import Dialog from "material-ui/Dialog";

class AuthorPageLightboxModal extends PureComponent {
  showNextImage = () => {
    alert("TODO: show next image");
  };

  showPreviousImage = () => {
    alert("TODO: show next image");
  };

  handleModalClose = () => {
    this.props.handleModalClose();
  };

  render() {
    return !this.props.payload ? null : (
      <div>
        <Dialog
          bodyClassName="authorPageLightboxModal-modalDialogBox"
          modal={false}
          open={this.props.open}
          paperClassName="authorPageLightboxModal-modalPaper"
          onRequestClose={this.props.handleModalClose}
          contentStyle={{}}
          autoScrollBodyContent={true}
        >
          <div className="authorPageLightboxModal-imageBox">
            <div
              className="authorPageLightboxModal-closeImage"
              onClick={() => this.handleModalClose()}
            >
              X
            </div>
            <div
              className="authorPageLightboxModal-nextImage"
              onClick={() => this.showNextImage()}
            />
            <div
              className="authorPageLightboxModal-lastImage"
              onClick={() => this.showPreviousImage()}
            />
            <img
              className="authorPageLightboxModal-image"
              src={this.props.payload.image}
              alt={`album image ${this.props.payload.id}`}
            />
            <div className="authorPageLightboxModal-imageDesc">
              {this.props.payload.desc ? this.props.payload.desc : null}
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default AuthorPageLightboxModal;
