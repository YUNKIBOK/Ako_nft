import React from "react";
import { Component } from 'react';
import './Market.css';

class Market extends Component {

  render() {
    return (
      <div>
        <h3>마켓 임시 페이지입니다.</h3>
        <div className="row text-center">
          {this.props.images.map((uri, key) => {
            return (
              <div key={key} className="col-md-2 mb-3">
                {this.props.approved[key] && <img className='token' src={uri} alt="token"></img>}
                {this.props.approved[key] && <div>{this.props.names[key]}</div>}
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default Market;


