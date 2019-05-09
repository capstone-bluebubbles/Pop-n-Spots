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
      const bars = pops.places.bars;
      const cocktails = pops.places.cocktails;
      const coffeeshop = pops.places.coffeeshops;
      const tacos = pops.places.tacos;
      const burgers = pops.places.burgers;
      const pizza = pops.places.pizza;

    return (
      <div className="info-container">
        <h3>User Places</h3>
        {bars.map(place =>{
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
        )})}
      </div>
    );
  } else{
    return (
      <div>Loading...</div>
    )
  }
}
}
const mapDispatchToProps = dispatch => ({
  fetchUser: (uID) => dispatch(fetchUser(uID))
});

const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(mapStateToProps, mapDispatchToProps)(PopCard);
