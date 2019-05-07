import React from "react";
import { connect } from "react-redux";

const InfoCard = props => {
  console.log(`what is this thing?????`, this);
  return (
    <div className="info-container">
      <h2>{props.place.title}</h2>
      <ul>
        <li>{props.place.address}</li>
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({
  places: state.places
});

export default connect(mapStateToProps)(InfoCard);
