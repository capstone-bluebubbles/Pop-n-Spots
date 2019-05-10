import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const styles = {
  card: {
    position: "reletive",
    maxWidth: 300,
    // height: "38vh",
    color: "black"
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9,
    marginTop: "30"
  },
  overlay: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "white",
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

function CoffeeButton(props) {
  const { classes } = props;
  return (
    <Card className={classes.card} height="20">
      <CardActionArea
        component={Link}
        to="/landing/?category=coffeeshop"
      // onClick={() => console.log(`IS THIS CLICKING`)}
      >
        <CardMedia
          component="img"
          height="300"
          image={require("../images/coffee.jpg")}
        />
        <CardContent>
          <Typography
            className={classes.typography}
            gutterBottom
            variant="h5"
            component="h1">
            Coffee
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

CoffeeButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CoffeeButton);
