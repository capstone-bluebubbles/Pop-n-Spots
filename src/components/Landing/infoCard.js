import React from "react";
import { connect } from "react-redux";

const InfoCard = props => {
  //console.log(`THE OBJECT===>`, props);
  const weekObject = props.place.popularTimesHistogram;

  for (let day in weekObject) {
    //console.log(`!!!!`, day);
  }
  //console.log(`This THINGG-----<`, weekObject);
  return (
    <div className="info-container">
      <h3 className="place-title">{props.place.title}</h3>
      <ul style={{ listStyle: "none" }}>
        <li>Address: {props.place.address}</li>
        <li>Phone: {props.place.phone}</li>
        <li>Star Rating: {props.place.totalScore}</li>
        {/* {props.place.popularTimesHistogram.Fr.map((time, index) => (
          <li key={index}>{time}</li>
        ))} */}
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({
  places: state.places
});

export default connect(mapStateToProps)(InfoCard);
