import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useStyles from "./styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { CircularProgress, Grid, Typography } from "@material-ui/core";
import { SearchContext } from "../../context/SearchContext";
import ProgressLoader from "../progressLoader";

export default function Meals() {
  const classes = useStyles();
  const [meals, setMeals] = useState([]);

  const { searchResults } = useContext(SearchContext);

  const randomMealURL = "https://www.themealdb.com/api/json/v1/1/random.php";
  const promise1 = axios.get(randomMealURL);
  const promise2 = axios.get(randomMealURL);
  const promise3 = axios.get(randomMealURL);
  const promise4 = axios.get(randomMealURL);
  const promise5 = axios.get(randomMealURL);

  useEffect(() => {
    setMeals([]);
    let isMounted = true;
    Promise.all([promise1, promise2, promise3, promise4, promise5]).then(
      (res) => {
        const fiveRandomMeals = res.map((meal) => meal.data.meals[0]);
        if (isMounted)
          setMeals(searchResults.length ? searchResults : fiveRandomMeals);
      }
    );
    return () => {
      isMounted = false;
    };
  }, [searchResults]);

  return (
    <div className={classes.root}>
      {!!meals.length ? (
        <GridList className={classes.gridList} cols={2.5}>
          {meals.map((meal, i) => (
            <Link key={`${meal.idMeal}-${i}`} to={`/meal/${meal.idMeal}`}>
              <GridListTile>
                <img src={meal.strMealThumb} alt={meal.strMeal} />
                <GridListTileBar
                  title={meal.strMeal}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                  }}
                  actionIcon={
                    <IconButton aria-label={`star ${meal.strMeal}`}>
                      <StarBorderIcon className={classes.title} />
                    </IconButton>
                  }
                />
              </GridListTile>
            </Link>
          ))}
        </GridList>
      ) : (
        <Grid className={classes.spinner}>
          <ProgressLoader />
        </Grid>
      )}
    </div>
  );
}
