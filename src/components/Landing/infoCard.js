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

    // current day abbreviation
    const date = new Date();
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    this.currentDay = days[date.getDay()];
    this.currentHour = date.getHours();
  }

  //Pop function
  async addPop(uID, locationId) {
    try {
      const User = userRef.child(uID);
      const popsRef = User.child('pops')
      await popsRef.on('value', snapshot => {
        const pops = snapshot.val();
        this.setState({
          pops: pops
        })
      })
      let pops = await this.state.pops
      if(pops === undefined){
        pops = []
      }
      let popFound = false
      let placeIndex;
      let timesPopped;
      if(pops !== null){
      for (let i = 0; i <= pops.length-1; i++) {
        if (pops[i].placeKey === locationId) {
          popFound = true;
          placeIndex = i.toString();
          timesPopped = this.state.pops[i].timestamp.length;
          break;
        }
      }}
      if (popFound === true) {
        let foundPlaceRef = popsRef.child(`${placeIndex}`);
        foundPlaceRef.update({
          'dropped': false
        })
        let popRef = foundPlaceRef.child('timestamp').child(`${timesPopped}`)
        popRef.set(
          Date.now()
        )
      } else {
        if (pops === null){
          pops = []
        }
        const length = pops.length.toString()
        let popper = popsRef.child(`${length}`)
        popper.update({
          popIndex: length,
          placeKey: locationId,
          timestamp: {
            0: Date.now()
          }
        });
      }
    } catch (err) {
      console.error(err);
    }
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(location, address) {
  window.open(`http://maps.google.com/?q=${location},${address}`);
  }
  
  render() {
    let popDataTarget = 0;
    const popData = this.props.place.popularTimesHistogram;
    if (popData) {
      const popDataCurrentDay = popData[this.currentDay];
      if (popDataCurrentDay) {
        for (let index = 0; index < popDataCurrentDay.length; index++) {
          const hour = popDataCurrentDay[index].hour;
          if (hour === this.currentHour) {
            popDataTarget = popDataCurrentDay[index].occupancyPercent;
          }
        }
      }
    }

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div className="info-container">
            <ul className="place-box">
              <h3 className="place-title">{this.props.place.title}</h3>
              <div className="place-title">
                {Array.from({ length: this.props.place.totalScore }).map(
                  (j, i) => (
                    <span key={i} className="stars">
                      ⭐
                    </span>
                  )
                )}
              </div>
            </ul>
            <ul className="info-card">
              <li className="place-website">
                <Link target="_blank" to={`www.${this.props.place.website}`}>
                  {this.props.place.website}
                </Link>
              </li>
              <br />
              <li className="place-address">{this.props.place.address}</li>
              <li className="phone">{this.props.place.phone}</li>
              <br />
              <li className="poppin-title">{popDataTarget}% POPPIN</li>
            </ul>
            <button
              className="navigate-button"
              type="button"
              onClick={() => {
                this.handleClick(this.props.place.title, this.props.place.address);
              }}>
              NAV
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

export default withAuthorization(condition)(Infocard);
