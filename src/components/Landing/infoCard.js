import React from "react";
import { connect } from "react-redux";
import { fetchUser, fetchPops } from "../../store/user";
import { fetchPlaces } from "../../store/places";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext, withAuthorization } from "../Session";
import { userRef } from "../Firebase/firebase";

class InfoCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pops: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  //Pop function
  async addPop(uID, locationId) {
    try {
      const User = userRef.child(uID);
      const popsRef = User.child("pops");
      await popsRef.on("value", snapshot => {
        const pops = snapshot.val();
        this.setState({
          pops: pops
        });
      });
      let pops = await this.state.pops;
      let popFound = false;
      let placeIndex;
      let timesPopped;
      for (let i = 0; i <= pops.length - 1; i++) {
        if (pops[i].placeKey === locationId) {
          popFound = true;
          placeIndex = i.toString();
          timesPopped = this.state.pops[i].timestamp.length;
          break;
        }
      }
      if (popFound === true) {
        let foundPlaceRef = popsRef
          .child(`${placeIndex}`)
          .child("timestamp")
          .child(`${timesPopped}`);
        foundPlaceRef.set(Date.now());
      } else {
        const length = pops.length.toString();
        let popper = popsRef.child(`${length}`);
        popper.update({
          placeKey: locationId,
          timestamp: { 0: Date.now() }
        });
      }
    } catch (err) {
      console.error(err);
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(location) {
    window.open(`http://maps.google.com/?q=${location}`);
  }

  render() {
    console.log(`THE OBJECT===>`, this.props);
    const weekObject = this.props.place.popularTimesHistogram;
    for (let day in weekObject) {
      //console.log(`!!!!`, day);
    }

    //  console.log('props', this.props)
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div className="info-container">
            <h3 className="place-title">{this.props.place.title}</h3>
            <ul className="info-card">
              <li>
                <Link target="_blank" to={`www.${this.props.place.website}`}>
                  {this.props.place.website}
                </Link>
              </li>
              <br />
              <li>{this.props.place.address}</li>
              <li className="phone">{this.props.place.phone}</li>
              {/* <li className="star-rating">STARS: {this.props.place.totalScore}</li> */}
              <br />
              <li>
                {Array.from({ length: this.props.place.totalScore }).map(
                  (j, i) => (
                    <span key={i}> ⭐ </span>
                  )
                )}
              </li>
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
              onClick={() => {
                this.addPop(authUser.uid, this.props.place.locationId);
              }}>
              POP
            </button>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  fetchUser: uID => dispatch(fetchUser(uID)),
  fetchPops: places => dispatch(fetchPops(places)),
  fetchPlaces: () => dispatch(fetchPlaces())
  // addPop: (uID, locationID) => dispatch(addPop(uID, locationID))
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

export default withAuthorization(condition)(InfoCard);
