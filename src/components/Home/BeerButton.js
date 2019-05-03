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
    color: "yellow"
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

function BeerButton(props) {
  const { classes } = props;
  return (
    <Card className={classes.card} height="20">
      <CardActionArea
        component={Link}
        to="/landing"
        onClick={() => console.log(`IS THIS CLICKING`)}>
        <CardMedia
          component="img"
          height="300"
          image={require("../images/beer.jpg")}
        />
        <div style={styles.overlay}>Beer</div>
        <CardContent>
          <Typography
            className={classes.typography}
            gutterBottom
            variant="h5"
            component="h2">
            Beer
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Thirsty, drink my friend!
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

BeerButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BeerButton);
