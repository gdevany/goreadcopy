import { grey100, grey700 } from "material-ui/styles/colors";

export const modalStyles = {
  contentStyle: {
    width: "80%",
    maxWidth: "none"
  },
  hintStyleAlbumName: {
    fontSize: "1.5em",
    fontWeight: "bold",
    paddingLeft: "25px",
    bottom: 0
  },
  underlineStyleAlbumName: {
    width: "150%",
    maxWidth: "436px",
    borderBottom: 0,
    borderColor: grey100,
    borderStyle: "dotted",
    bottom: "-24px"
  },
  inputStyleAlbumName: {
    color: grey700,
    fontSize: "1.5em",
    fontWeight: "bold",
    paddingLeft: "25px",
    boxShadow: "none",
    bottom: "-12px"
  },
  hintStyleDesc: {
    fontSize: "24px",
    top: 0
  },
  underlineStyleDesc: {
    border: "none"
  },
  inputStyleDesc: {
    border: "none",
    fontSize: "24px"
  }
};

export const mobileModalStyles = {
  mobileContentStyle: {
    width: "100%",
    maxWidth: "none"
  },
  mobileHintStyleAlbumName: {
    fontSize: "16px",
    bottom: "12px"
  },
  mobileUnderlineStyleAlbumName: {
    border: "none",
    bottom: 0
  },
  mobileInputStyleAlbumName: {
    color: grey700,
    fontSize: "16px",
    fontWeight: "bold",
    boxShadow: "none",
    bottom: 0
  },
  mobileHintStyleDesc: {
    fontSize: "16px",
    top: 0
  },
  mobileUnderlineStyleDesc: {
    border: "none"
  },
  mobileInputStyleDesc: {
    border: "none"
  }
};
