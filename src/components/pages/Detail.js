import React from "react";
import { Component } from 'react';

class Detail extends Component {

    render() {
        return (
            <div>
                <h3>관리 임시 페이지입니다.</h3>
                <img src={this.props.images[this.props.id]} alt='token'></img>
                <div>{this.props.names[this.props.id]}</div>
                <div>{this.props.descriptions[this.props.id]}</div>
                <div>{this.props.price}</div>
            </div>
        );
    }
}

export default Detail;

/*
const Temp = () => {
    const location = useLocation();
    console.log(location.state.name)
    return (
      <div>
          {location.state.name}
      </div>
    )
  }
  export default Temp
  */