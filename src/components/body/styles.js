import { makeStyles } from "@material-ui/core/styles";
import bgImage from "../../assets/img/home-background.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: "center",
    color: "#fff",
    background: `url(${bgImage}) no-repeat center center fixed`,
    backgroundSize: "cover",
    height: "25em",
  },
  darkBG: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    height: "100%",
    width: "100%",
    background: "rgba(0, 0, 0, 0.7)",
  },
  subTitle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "4em 0",
    background: "#efffef",
  },
}));

export default useStyles;
