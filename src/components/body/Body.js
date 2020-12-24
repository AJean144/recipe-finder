import React, { useEffect } from "react";
import useStyles from "./styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Meals from "../meals";
import logo from "../../assets/img/logo.png";

export default function Body() {
  const classes = useStyles();

  useEffect(() => {}, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className={classes.paper}>
            <div className={classes.darkBG}>
              <img src={logo} />
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid className={classes.subTitle} item xs={12}>
        <Typography variant="h3" component="h4" gutterBottom>
          Recipes of the day
        </Typography>
      </Grid>
      <Meals />
    </div>
  );
}
