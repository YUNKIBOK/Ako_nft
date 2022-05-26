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
                    this.props.priceUpdate(key)
                  }}>
                    <div>
                    {this.props.approved[key] && <img src={uri} alt="temp" style={{ width: "200px", height: "200px" ,left:'50px', position:'absolute'}}></img>}
                    </div>

                    <div style={{ width: "200px", height: "30px", background: "gainsboro", left:'50px', top:'200px',position:'absolute'}}>
                      {this.props.approved[key] && <p style={{ float: "left", marginLeft: "10px", marginTop: "3px" }}>{this.props.names[key]}</p>}
                      {this.props.approved[key] && <p style={{ float: "right", marginRight: "10px", marginTop: "3px" }}>{this.props.likes[key]}</p>}
                      {this.props.approved[key] && <p style={{ float: "right", marginRight: "5px", marginTop: "3px" }}><span role="img" aria-label="heart">❤️</span></p>}
                      {this.props.approved[key] && <p style={{ float: "right", marginRight: "10px", marginTop: "3px" }}>{parseInt(this.props.prices[key]._hex, 16)}</p>}
                      {this.props.approved[key] && <img style={{ float: "right", height: "20px", width: "auto", marginRight: "5px", marginTop: "3px" }} src="../images/eth.png" alt="eth"></img>}
                    </div>
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