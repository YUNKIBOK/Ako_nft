import React from "react";
import { Component } from 'react';
import './Market.css';
import {Link} from 'react-router-dom';

class Market extends Component {

  render() {
    return (
      <div>
        <h3>마켓 임시 페이지입니다.</h3>
        <div className="row text-center" style={{height:'700px'}}>
          {this.props.images.map((uri, key) => {
            return (
              this.props.approved[key] && <div key={key} className="col-md-2 mb-3">
                <Link to="/Detail">
                  <div onClick={() => {
                    this.props.idUpdate(key)
                    this.props.priceUpdate(key)}}>
                  {this.props.approved[key] && <img className='token' src={uri} alt="token"></img>}
                  {this.props.approved[key] && <div>{this.props.names[key]}</div>}
                  {this.props.approved[key] && <div>{this.props.likes[key]}</div>}
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default Market;


