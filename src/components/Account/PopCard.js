import React from "react";
import { connect } from "react-redux";
import { fetchUser } from '../../store/user'
class PopCard extends React.Component {
  constructor(props) {
    super();
  }

  componentDidMount(){
    this.props.fetchUser(this.props.uID)
  }

  render() {
    let pops = this.props.user.pops
    if(pops !== undefined){
    console.log(Object.keys(pops.places))
    }
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

const mapDispatchToProps = dispatch => ({
  fetchUser: (uID) => dispatch(fetchUser(uID))
});

const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(mapStateToProps, mapDispatchToProps)(PopCard);
