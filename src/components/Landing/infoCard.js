import React from "react";
import { connect } from "react-redux";
import * as ROUTES from "../../constants/routes";

class InfoCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(location) {
    window.open(`http://maps.google.com/?q=${location}`);
  }

  render() {
    //console.log(`THE OBJECT===>`, this.props);
    const weekObject = this.props.place.popularTimesHistogram;
    for (let day in weekObject) {
      //console.log(`!!!!`, day);
    }
    return (
      <div className="info-container">
        <h3 className="place-title">{this.props.place.title}</h3>
        <ul className="info-card">
          <li>{this.props.place.address}</li>
          <li>Phone: {this.props.place.phone}</li>
          <li>Star Rating: {this.props.place.totalScore}</li>
        </ul>
        <button
          className="navigate-button"
          type="button"
          onClick={() => {
            this.handleClick(this.props.place.title);
          }}>
          NAVIGATE
        </button>
        <button
          className="pop-button"
          type="button"
          onClick={() => console.log(`IS THIS CLICKING`)}>
          POP
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  places: state.places
});

export default connect(mapStateToProps)(InfoCard);
