import React, { Component } from "react";
import {Link} from 'react-router-dom';
import './OnMarket.css';

class OnMarket extends Component {

    render(){
        return (
            <div>
                <div className="row" style={{ height: '65vh' }}>
                    {this.props.images.map((uri, key) => {
                        return (
                            this.props.approved[key] && (this.props.owners[key] === this.props.account) && <div key={key} className="col-md-2 mb-3">
                            <Link to="/Detail">
                  <div onClick={() => {
                    this.props.idUpdate(key)
                    this.props.priceUpdate(key)
                  }}>
                    {/*<div>
                    {this.props.approved[key] && <img src={uri} alt="temp" style={{ width: "200px", height: "200px" ,left:'50px', position:'absolute'}}></img>}
                </div>*/}

<div style={{ width: "220px", height: "265px", position:'relative', left: '15px',border:'solid lightgray 1px',borderRadius:"10px",boxShadow:"10px 5px 5px gray"}}>
                        {this.props.owners[key] && <div style={{ overflow: "hidden", whiteSpace:"nowrap", textOverflow:"ellipsis", width: "200px", float: "left", marginLeft: "10px", marginTop: "3px" }}>#{key+1} {this.props.names[key]}</div>}<br/>
                        {this.props.owners[key] && <img src={this.props.images[key]} alt="temp" style={{ width: "200px", height: "200px" ,left:'10px', marginTop: '5px', position:'absolute'}}></img>}
                        {this.props.owners[key] && <div style={{ float: "right", marginRight: "10px", marginTop: "210px" }}>{this.props.likes[key]}</div>}
                        {this.props.owners[key] && <div style={{ float: "right", marginRight: "5px", marginTop: "210px" }}>❤️</div>}
                        {this.props.owners[key] && <div style={{ float: "right", marginRight: "10px", marginTop: "210px" }}>{parseInt(this.props.prices[key]._hex, 16)}</div>}
                        {this.props.owners[key] && <img style={{ float: "right", height: "20px", width: "auto", marginRight: "5px", marginTop: "210px" }} src="../images/eth.png" alt="eth"></img>}
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