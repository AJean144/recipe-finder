import React, { useState } from "react";
import useStyles from "./styles";
import { useTheme } from "@material-ui/core/styles";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import SearchIcon from "@material-ui/icons/Search";

export default function Search() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const mainFab = {
    color: "secondary",
    className: classes.fab,
    icon: <SearchIcon />,
    label: "Search",
  };

  return (
    <Zoom
      key={mainFab.color}
      in
      timeout={transitionDuration}
      style={{
        transitionDelay: `1ms`,
      }}
      unmountOnExit
    >
      <Fab
        aria-label={mainFab.label}
        className={mainFab.className}
        color={mainFab.color}
      >
        {mainFab.icon}
      </Fab>
    </Zoom>
  );
}
