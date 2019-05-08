import React from "react";
import { connect } from "react-redux";

class PopCard extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    console.log(`THE OBJECT===>`, this.props);
    return (
      <div className="info-container">
        <h3>User Places</h3>
        <button
          className="lock-button"
          type="button"
          onClick={() => console.log(`IS THIS CLICKING`)}>
          LOCK!
        </button>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  places: state.places
});

export default connect(mapStateToProps)(PopCard);
