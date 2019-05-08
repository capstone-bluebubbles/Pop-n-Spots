import React from "react";
import { connect } from "react-redux";

const PopCard = props => {
  console.log(`THE OBJECT===>`, props);
  //console.log(`THE OBJECT===>`, props);
  return (
    <div className="info-container">
      <h3 className="place-title">User Places</h3>
    </div>
  );
};

const mapStateToProps = state => ({
  places: state.places
});

export default connect(mapStateToProps)(PopCard);
