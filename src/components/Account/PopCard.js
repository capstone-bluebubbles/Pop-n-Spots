import React from "react";
import { connect } from "react-redux";
import { fetchUser, fetchPops, getPops } from "../../store/user";
import { placesRef, userRef } from "../Firebase/firebase";
import { number } from "prop-types";

class PopCard extends React.Component {
  constructor(props) {
    super();
    this.count = 0;
    this.state = {
      pops: []
    };
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

  componentDidMount(event) {
    // let promise =
    this.props.fetchUser(this.props.uID);
    // promise.then(this.props.fetchPops(this.props.user.pops))
  }

  render() {
    // console.log('RENDER', JSON.stringify(this.props))
    // console.log(this.props.pops.length)
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
                    <div className="place-title">
                      {Array.from({ length: place.totalScore }).map((j, i) => (
                        <span key={i}> ⭐ </span>
                      ))}
                    </div>
                  </ul>
                  <div className="buttons">
                    <button
                      className="lock-button"
                      type="button"
                      onClick={() => this.lockPlace(place.locationId)}>
                      LOCK!
                    </button>
                    <button
                      className="lock-button"
                      type="button"
                      onClick={() => this.dropPlace(place.locationId)}>
                      DROP!
                    </button>
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
  pops: state.user.pops
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PopCard);
