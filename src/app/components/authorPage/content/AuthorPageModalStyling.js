import { grey100, grey700 } from "material-ui/styles/colors";

export const modalStyles = {
  contentStyle: {
    width: "80%",
    maxWidth: "none"
  },
  mobileContentStyle: {
    width: "100%",
    maxWidth: "none",
  },
  hintStyleAlbumName: {
    fontSize: "1.5em",
    fontWeight: "bold",
    paddingLeft: "25px",
    bottom: 0
  },
  mobileHintStyleAlbumName: {
    fontSize: "16px",
    bottom: "12px"
  },
  underlineStyleAlbumName: {
    width: "150%",
    maxWidth: "436px",
    borderBottom: 0,
    borderColor: grey100,
    borderStyle: "dotted",
    bottom: "0 !important"
  },
  mobileUnderlineStyleAlbumName: {
    border: "none",
    bottom: 0
  },
  inputStyleAlbumName: {
    color: grey700,
    fontSize: "1.5em",
    fontWeight: "bold",
    paddingLeft: "25px",
    margin: "1em 0 0.5em",
    height: "auto",
    boxShadow: "none"
  },
  mobileInputStyleAlbumName: {
    color: grey700,
    fontSize: "16px",
    fontWeight: "bold",
    boxShadow: "none",
    bottom: 0
  },
  hintStyleDesc: {
    padding: "25px",
    fontSize: "24px",
    top: "0.5em"
  },
  mobileHintStyleDesc: {
    fontSize: "16px",
    top: 0
  },
  underlineStyleDesc: {
    border: "none"
  },
  mobileUnderlineStyleDesc: {
    border: "none"
  },
  inputStyleDesc: {
    padding: "25px",
    border: "none"
  },
  mobileInputStyleDesc: {
    border: "none"
  }
};
