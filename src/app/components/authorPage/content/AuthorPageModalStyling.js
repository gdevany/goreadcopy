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
  hintStyleDesc: {
    padding: "25px",
    fontSize: "24px",
    top: "0.5em"
  },
  underlineStyleAlbumName: {
    width: "150%",
    maxWidth: "436px",
    borderBottom: 0,
    borderColor: grey100,
    borderStyle: "dotted",
    bottom: "0 !important"
  },
  underlineStyleDesc: {
    border: "none"
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
  inputStyleDesc: {
    padding: "25px",
    border: "none"
  }
};
