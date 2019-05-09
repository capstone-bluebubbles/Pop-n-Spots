import React from "react";
import { connect } from "react-redux";
import { fetchUser, fetchPops } from '../../store/user'


class PopCard extends React.Component {
  constructor(props) {
    super();
  }

  componentDidMount(){
    this.props.fetchUser(this.props.uID)
  }

  shouldComponentUpdate(){
    if (Object.keys(this.props.pops).length === 0){
      return false;
    } else {
      return true;
    }
  }

  componentDidUpdate(){
    if (Object.keys(this.props.pops).length === 0){
      this.props.fetchPops(this.props.user.pops)
    }
  }

  render() {
    let pops = this.props.user
    console.log(this.props)
    if(pops !== undefined){

    return (
      <div className="info-container">
        <h3>User Places</h3>
        {/* {bars.map(place =>{
            return(
        <div>
        <button
          className="lock-button"
          type="button"
          onClick={() => console.log(`IS THIS CLICKING`)}>
          LOCK!
        </button>
              {place.title}

              {place.address}
        </div>
        )})} */}
      </div>
    );
  } else{
    return (
      <div>Blockchain UI working...</div>
    )
  }
}
}
const mapDispatchToProps = dispatch => ({
  fetchUser: (uID) => dispatch(fetchUser(uID)),
  fetchPops: (places) => dispatch(fetchPops(places))
});

const mapStateToProps = state => ({
  user: state.user.user,
  pops: state.user.pops,
});

export default connect(mapStateToProps, mapDispatchToProps)(PopCard);
