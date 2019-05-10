import React from "react";
import { connect } from "react-redux";
import { fetchUser, fetchPops, getPops } from "../../store/user";
import { placesRef } from "../Firebase/firebase";

class PopCard extends React.Component {
  constructor(props) {
    super();
    this.count = 0;
    this.state = {
      pops: []
    };
  }

  componentDidMount() {
    this.props.fetchUser(this.props.uID);
    // this.props.fetchPops(this.props.user.pops)
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.count++;
      this.props.fetchPops(this.props.user.pops);
    }
  }

  render() {
    if (this.props.pops.length > 0) {
      return (
        <div className="pops-card">
          <h3 className="user-places-title">Your Popped Places</h3>
          {this.props.pops.map(place => {
            return (
              <div>
                <div className="pops-card-title">{place.title}</div>
                <div> {place.address}</div>
                <div className="pops-card-title">
                  <button
                    className="lock-button"
                    type="button"
                    onClick={() => console.log(`IS THIS CLICKING`)}>
                    LOCK!
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return <div>Blockchain UI working...</div>;
    }
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
