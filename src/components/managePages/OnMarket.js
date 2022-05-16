import React, { Component } from "react";
import {Link} from 'react-router-dom';
import './OnMarket.css';

class OnMarket extends Component {

    render(){
        return (
            <div>
                <h3>OnMarket 임시 페이지입니다.</h3>
                <div className="row text-center" style={{height:'600px'}}>
                    {this.props.images.map((uri, key) => {
                        return (
                            this.props.approved[key] && (this.props.owners[key] === this.props.account) && <div key={key} className="col-md-2 mb-3">
                            <Link to="/Detail">
                              <div onClick={() => {
                                this.props.idUpdate(key)
                                this.props.priceUpdate(key)}}>
                                {this.props.approved[key] && (this.props.owners[key] === this.props.account) && <img className='token' src={uri} alt="token"></img>}
                                {this.props.approved[key] && (this.props.owners[key] === this.props.account) && <div>{this.props.names[key]}</div>}
                                {this.props.approved[key] && (this.props.owners[key] === this.props.account) && <div>{this.props.likes[key]}</div>}
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
    
    export default OnMarket;