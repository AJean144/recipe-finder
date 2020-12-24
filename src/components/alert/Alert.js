import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import { SearchContext } from "../../context/SearchContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function NotificationAlert() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const {
    searchResults,
    setSearchResults,
    validationError,
    setValidationError,
    handleOnChange,
  } = useContext(SearchContext);

  return (
    <div className={classes.root}>
      <Collapse in={!!validationError}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {validationError}
        </Alert>
      </Collapse>
    </div>
  );
}
