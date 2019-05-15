import React from 'react';
import { connect } from 'react-redux';
import { fetchUser, fetchPops } from '../../store/user';
import { Link, Redirect } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext, withAuthorization } from '../Session';
import { userRef } from '../Firebase/firebase';
import { setCurrentCategory, getCurrentPosition, calculateDistanceMetrics, calculateDistance } from "../../store/position"
// import bubble00 from '../../../public/NewBubble00.png'
// import bubble33 from '../../../public/NewBubble33.png'
// import bubble66 from '../../../public/NewBubble66.png'
// import bubble99 from '../../../public/NewBubble99.png'

class InfoCard extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    pops: []
  };
    this.handleClick = this.handleClick.bind(this);

// current day abbreviation
const date = new Date();
const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
this.currentDay = days[date.getDay()];
this.currentHour = date.getHours();
this.bubbles = [
  "/NewBubble00.png",
  "/NewBubble33.png",
  "/NewBubble66.png",
  "/NewBubble99.png"
];
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
      let foundPlaceRef = popsRef.child(`${placeIndex}`);
      foundPlaceRef.update({
        dropped: false
      });
      let popRef = foundPlaceRef.child("timestamp").child(`${timesPopped}`);

      popRef.set(Date.now());
    } else {
      const length = pops.length.toString();
      let popper = popsRef.child(`${length}`);
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
}

historyData = popData => {
  let popDataTarget = 0;
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
  let popDataTargetFrame = 0;

  // we have chosen to adopt the following ranges for our bubbles
  // white -> 0 ... 10%
  // green -> 11% ... 50%
  // yellow -> 51% ... 75%
  // red -> 76% ... 100%

  if (0 < popDataTarget && popDataTarget <= 10) {
    popDataTargetFrame = 0;
  }
  if (10 < popDataTarget && popDataTarget <= 50) {
    popDataTargetFrame = 1;
  }
  if (50 < popDataTarget && popDataTarget <= 75) {
    popDataTargetFrame = 2;
  }
  if (75 < popDataTarget) {
    popDataTargetFrame = 3;
  }

  // safety check
  popDataTargetFrame = Math.max(popDataTargetFrame, 0);
  popDataTargetFrame = Math.min(popDataTargetFrame, this.bubbles.length - 1);

  const image = this.bubbles[popDataTargetFrame]

  console.log(image)

  return (
    <div className="pops-card-title-icon-container">
      <div> {`${popDataTarget}% Poppin`} </div>
      <img
        className="pops-card-title_icon"
        style={{ height: "30px", width: "30px" }}
        src={this.bubbles[popDataTargetFrame]}
      />
    </div>
  );
};

locationData = address => {
  let result = address;
  let located = result.indexOf("Located");
  if (located !== -1) {
    result = result.slice(0, located);
  }
  let usa = result.indexOf(", USA");
  if (usa !== -1) {
    result = result.slice(0, usa);
  }
  let eua = result.indexOf(", EUA");
  if (eua !== -1) {
    result = result.slice(0, eua);
  }
  return result;
};

handleClick(location, address) {
  window.open(
    `http://maps.google.com/maps?saddr=${this.props.currentPosition.lat}+${
    this.props.currentPosition.lng
    }&daddr=${location},${address}`
  );
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

  let place = this.props.place;

  return (
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <div className="map-page-card">
            <div className="map-card-title-container">
              <div className="map-card-title">{place.title}</div>
              <div className="map-card-title-icon">
                {this.historyData(place.popularTimesHistogram)}
              </div>
            </div>
            <ul className="map-card-address-container">
              <br />
              <div className="map-card-address">
                {this.locationData(place.address)}
              </div>

              {place.phone ? (
                <div className="map-card-phone">
                  <a href="tel:${place.phone}" >
                    {`${place.phone.slice(2, 5)}-${place.phone.slice(
                      5,
                      8
                    )}-${place.phone.slice(8)}`}
                  </a>

                </div>
              ) : (
                  <div />
                )}

              <div className="pops-card-mile">
                {`Distance : ${distanceText(this.props.currentPosition, place)} miles`}
              </div>
              <div className="place-title">
                {Array.from({ length: place.totalScore }).map((j, i) => (
                  <span key={i}>🌟</span>
                ))}
              </div>
            </ul>
            <div className="map-card-buttons-container">
              <button
                className="navigate-button"
                type="button"
                onClick={() => {
                  this.handleClick(place.title, place.address);
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
          </div>
        ) : (
            <div className="map-page-card">
              <div className="map-card-title-container">
                <div className="map-card-title">{place.title}</div>
                <div className="map-card-title-icon">
                  {this.historyData(place.popularTimesHistogram)}
                </div>
              </div>
              <ul className="map-card-address-container">
                <br />
                <div className="map-card-address">{place.address}</div>
                <div className="map-card-phone">
                  {`${place.phone.slice(2, 5)}-${place.phone.slice(
                    5,
                    8
                  )}-${place.phone.slice(8)}`}
                </div>
                <div className="map-card-mile">1.5 Miles</div>
                <div className="place-title">
                  {Array.from({ length: place.totalScore }).map((j, i) => (
                    <span key={i}> ⭐ </span>
                  ))}
                </div>
              </ul>
              <div className="map-card-buttons-container">
                <button
                  className="navigate-button"
                  type="button"
                  onClick={() => {
                    this.handleClick(place.title, place.address);
                  }}>
                  NAV
                </button>

                <Link to={ROUTES.SIGN_IN} className="pop-button" type="button">
                  POP
                </Link>
              </div>
            </div>
          )
      }
    </AuthUserContext.Consumer>
  );
}
}

const distanceText = (currentPosition, place) => {
  let result = calculateDistance(currentPosition, { lat: Number(place.gpsLat), lng: Number(place.gpsLong) })
  result = result / calculateDistanceMetrics.KM_PER_MILE
  result = result.toFixed(1)
  return result
}

const mapDispatchToProps = dispatch => ({
  fetchUser: uID => dispatch(fetchUser(uID)),
  fetchPops: places => dispatch(fetchPops(places))
  // addPop: (uID, locationID) => dispatch(addPop(uID, locationID))
});

const mapStateToProps = state => ({
  user: state.user.user,
  pops: state.user.pops,
  places: state.places,
  currentPosition: state.position.currentPosition
});
const condition = authUser => !!authUser;

const Infocard = connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoCard);

export default Infocard;
