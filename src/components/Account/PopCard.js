import React from "react";
import { connect } from "react-redux";
import { fetchUser, fetchPops, getPops } from "../../store/user";
import { placesRef, userRef } from "../Firebase/firebase";

class PopCard extends React.Component {
  constructor(props) {
    super();
    this.count = 0;
    this.state = {
      pops: []
    };
    // current day abbreviation
    const date = new Date();
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    this.currentDay = days[date.getDay()];
    this.currentHour = date.getHours();
    this.bubbles = [
      "NewBubble00.png",
      "NewBubble33.png",
      "NewBubble66.png",
      "NewBubble99.png"
    ];
  }

  handleClick(location, address) {
    window.open(
      `http://maps.google.com/maps?saddr=${this.props.currentPosition.lat}+${
        this.props.currentPosition.lng
      }&daddr=${location},${address}`
    );
  }

  lockPlace(place) {
    const match = this.props.user.pops.find(user => user.placeKey === place);
    const popsRef = userRef
      .child(this.props.uID)
      .child("pops")
      .child(match.popIndex);
    popsRef.update({ locked: true });
  }

  dropPlace(place) {
    const match = this.props.user.pops.find(user => user.placeKey === place);
    const popsRef = userRef
      .child(this.props.uID)
      .child("pops")
      .child(match.popIndex);
    popsRef.update({ dropped: true });
  }

  numberOfPops(popsObj) {
    const userPops = this.props.user.pops;
    if (!userPops) {
      return "No Pops!";
    } else {
      for (let i = 0; i < userPops.length; i++) {
        // console.log('POPSOBJ',popsObj.locationId, 'USERKEYS', userPops[i].placeKey)
        if (popsObj.locationId === userPops[i].placeKey) {
          return Object.keys(userPops[i].timestamp).length;
        }
      }
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

    return (
      <div className="pops-card-title-icon-container">
        <div> {`${popDataTarget}% Poppin`} </div>
        <img
          className="pops-card-title_icon"
          style={{ height: "30px", width: "30px" }}
          src={`${this.bubbles[popDataTargetFrame]}`}
        />
      </div>
    );
  };

  componentDidMount(event) {
    // let promise =
    this.props.fetchUser(this.props.uID);
    // promise.then(this.props.fetchPops(this.props.user.pops))
  }

  render() {
    if (this.props.pops.length >= 1) {
      return (
        <div>
          <div className="user-page-card">
            {this.props.pops.map(place => {
              return (
                <div className="pops-card" key={place.locationId}>
                  <div className="pops-card-title-container">
                    <div className="pops-card-title">{place.title}</div>
                    <div className="pops-card-title-icon">
                      {this.historyData(place.popularTimesHistogram)}
                    </div>
                  </div>
                  <ul className="pops-card-address-container">
                    <br />
                    <div className="pops-card-address">{place.address}</div>
                    <div className="pops-card-phone">
                      <a href="tel:${place.phone}" >
                      {`${place.phone.slice(2, 5)}-${place.phone.slice(
                        5,
                        8
                      )}-${place.phone.slice(8)}`}
                      </a>
                    </div>
                    <div className="pops-card-mile">1.5 Miles</div>
                    <div className="place-title">
                      {Array.from({ length: place.totalScore }).map((j, i) => (
                        <span key={i}> 🌟 </span>
                      ))}
                    </div>
                  </ul>
                  <div className="pops-card-buttons-container">
                    <button
                      className="pops-card-button"
                      type="button"
                      onClick={() => {
                        this.handleClick(place.title, place.address);
                      }}>
                      NAV
                    </button>
                    <div className="pops-card-button-container-right">
                      <button
                        className="pops-card-button"
                        type="button"
                        onClick={() => this.lockPlace(place.locationId)}>
                        LOCK!
                      </button>
                      <button
                        className="pops-card-button-right"
                        type="button"
                        onClick={() => this.dropPlace(place.locationId)}>
                        DROP!
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return <div>Blockchain UI working...</div>;
  }
}
const mapDispatchToProps = dispatch => ({
  fetchUser: uID => dispatch(fetchUser(uID)),
  fetchPops: places => dispatch(fetchPops(places))
});

const mapStateToProps = state => ({
  user: state.user.user,
  pops: state.user.pops,
  currentPosition: state.position.currentPosition
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PopCard);
