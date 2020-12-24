import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TwitterIcon from "@material-ui/icons/Twitter";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import IngredientsList from "./IngredientsList";
import CircularProgress from "@material-ui/core/CircularProgress";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
    minWidth: "100%",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "20%",
  },
  cardContent: {
    flexGrow: 1,
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Meal() {
  const classes = useStyles();
  const history = useHistory();
  const { idMeal } = useParams();
  const [meal, setMeal] = useState({});
  useEffect(() => {
    let isMounted = true;
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
      .then((res) => {
        if (isMounted) setMeal(res.data.meals[0]);
      })
      .catch((err) => console.error(err));
    return () => (isMounted = false);
  }, [idMeal]);

  const getIngredients = () =>
    Object.keys(meal).map((key) => {
      if (key.includes("strIngredient") && !!meal[key]) {
        return meal[key];
      }
    });

  return (
    <>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={12}>
            <Card className={classes.card}>
              {meal.strMealThumb ? (
                <CardMedia
                  className={classes.cardMedia}
                  image={meal.strMealThumb}
                  title={meal.strMeal}
                />
              ) : (
                <Grid className={classes.spinner}>
                  <CircularProgress />
                </Grid>
              )}
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h3" component="h2">
                  {meal.strMeal}
                </Typography>
                <hr />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6}>
                    <Typography gutterBottom variant="h6" component="h4">
                      Ingredients:
                    </Typography>
                    <IngredientsList list={getIngredients()} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Typography gutterBottom variant="h6" component="h4">
                      Instructions:
                    </Typography>

                    <Typography>{meal.strInstructions}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  <TwitterIcon /> Share this recipe on Twitter!
                </Button>
                <Button size="small" color="primary" onClick={history.goBack}>
                  Back to recipes
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
    </>
  );
}
