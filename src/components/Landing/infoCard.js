import React from "react";
import { connect } from "react-redux";
import { fetchUser, fetchPops, addPop } from "../../store/user";
import { fetchPlaces } from "../../store/places";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext, withAuthorization } from "../Session";

class InfoCard extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    //console.log(`THE OBJECT===>`, this.props);
    const weekObject = this.props.place.popularTimesHistogram;
    for (let day in weekObject) {
      //console.log(`!!!!`, day);
    }

     console.log('PROPS', this.props)
    return (
      <AuthUserContext.Consumer>
        {authUser => (
      <div className="info-container">
        <h3 className="place-title">{this.props.place.title}</h3>
        <ul className="info-card">
          <li>{this.props.place.address}</li>
          <li>Phone: {this.props.place.phone}</li>
          <li>Star Rating: {this.props.place.totalScore}</li>
        </ul>
        <button
          className="pop-button"
          type="button"
          onClick={() => {
            // this.props.addPop(authUser.uid, this.props.place.locationId)
            console.log(`${this.props}`);
          }}>
          POP
        </button>
      </div>
    )}
  </AuthUserContext.Consumer>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  fetchUser: uID => dispatch(fetchUser(uID)),
  fetchPops: places => dispatch(fetchPops(places)),
  fetchPlaces: () => dispatch(fetchPlaces()),
  addPop: (uID, locationID) => dispatch(addPop(uID, locationID))
});

const mapStateToProps = state => ({
  user: state.user.user,
  pops: state.user.pops,
  places: state.places
});
const condition = authUser => !!authUser;

const Infocard = connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoCard);

export default withAuthorization(condition)(InfoCard)
