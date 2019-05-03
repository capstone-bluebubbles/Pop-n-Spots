import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const styles = {
  card: {
    position: "reletive",
    maxWidth: 300,
    maxHeigth: 100,
    color: "purple"
  },
  overlay: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "white",
    textAlign: "center",
    fontFamily: "Roboto"
  },
  typography: {
    fontFamily: "Roboto",
    fontSize: 24,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500
  }
};

function CocktailButton(props) {
  const { classes } = props;
  return (
    <Card className={classes.card} height="20">
      <CardActionArea
        component={Link}
        to="/"
        onClick={() => console.log(`IS THIS CLICKING`)}>
        <CardMedia
          component="img"
          height="300"
          image={require("../images/cocktail.jpg")}
        />
        <div style={styles.overlay}>CockTails</div>
        <CardContent>
          <Typography
            className={classes.typography}
            gutterBottom
            variant="h5"
            component="h1">
            Cocktail
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Thirsty, drink my friend!
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

CocktailButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CocktailButton);
