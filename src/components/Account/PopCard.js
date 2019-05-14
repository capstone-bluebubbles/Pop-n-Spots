import React from 'react';
import { connect } from 'react-redux';
import { fetchUser, fetchPops, getPops } from '../../store/user';
import { placesRef, userRef } from '../Firebase/firebase';

class PopCard extends React.Component {
  constructor(props) {
    super();
    this.count = 0;
    this.state = {
      pops: [],
    };
    // current day abbreviation
    const date = new Date();
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    this.currentDay = days[date.getDay()];
    this.currentHour = date.getHours();
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
      .child('pops')
      .child(match.popIndex);
    popsRef.update({ locked: true });
  }

  dropPlace(place) {
    const match = this.props.user.pops.find(user => user.placeKey === place);
    const popsRef = userRef
      .child(this.props.uID)
      .child('pops')
      .child(match.popIndex);
    popsRef.update({ dropped: true });
  }

  numberOfPops(popsObj) {
    const userPops = this.props.user.pops;
    if (!userPops) {
      return 'No Pops!';
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
    return <div> {popDataTarget}% POPPIN</div>;
  };

  componentDidMount(event) {
    // let promise =
    this.props.fetchUser(this.props.uID);
    // promise.then(this.props.fetchPops(this.props.user.pops))
  }

  render() {
    // console.log('RENDER', JSON.stringify(this.props))
    // console.log(this.props.pops.length)
    console.log(this.props);
    if (this.props.pops.length >= 1) {
      return (
        <div>
          <div className="user-page-card">
            {this.props.pops.map(place => {
              return (
                <div className="pops-card" key={place.locationId}>
                  <ul>
                    <div className="pops-card-title">{place.title}</div>
                    <br />
                    <div className="pops-card-address"> {place.address}</div>
                    <div className="phone">{place.phone}</div>
                    <div className="pops-card-mile">1.5 Miles</div>
                    <div className="popular-time-percent">
                      {' '}
                      {this.historyData(place.popularTimesHistogram)}{' '}
                    </div>
                    <div className="place-title">
                      {Array.from({ length: place.totalScore }).map((j, i) => (
                        <span key={i}> ⭐ </span>
                      ))}
                    </div>
                  </ul>
                  <div className="buttons">
                    <ul>
                      <button
                        className="lock-button"
                        type="button"
                        onClick={() => this.lockPlace(place.locationId)}
                      >
                        LOCK!
                      </button>
                      <button
                        className="lock-button"
                        type="button"
                        onClick={() => this.dropPlace(place.locationId)}
                      >
                        DROP!
                      </button>
                      <button
                        className="lock-button"
                        type="button"
                        onClick={() => {
                          this.handleClick(place.title, place.address);
                        }}
                      >
                        NAV
                      </button>
                    </ul>
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
  fetchPops: places => dispatch(fetchPops(places)),
});

const mapStateToProps = state => ({
  user: state.user.user,
  pops: state.user.pops,
  currentPosition: state.position.currentPosition,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PopCard);
