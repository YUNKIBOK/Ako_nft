import React, { Component } from "react";
import {Link} from 'react-router-dom';
import './OrderByCreation.css';

class OrderByCreation extends Component {

    render() {

        return (
          <div class="list_container" style={{ height: '81vh' }}>
            <div className="row text-center" style={{ height: '81vh' }}>
              {this.props.orderByCreationid.map((id, key) => { 
                return (
                    this.props.approved[id-1] && <div key={key} className="col-md-2 mb-3">
                    <Link to="/Detail">
                      <div onClick={() => {
                        this.props.idUpdate(id-1)
                        this.props.priceUpdate(id-1)
                      }}>
    
                        <div style={{ width: "220px", height: "265px", background: "gainsboro", position:'absolute'}}>
                          {this.props.approved[id-1] && <div style={{ float: "left", marginLeft: "10px", marginTop: "3px" }}>{this.props.names[id-1]}</div>}<br/>
                          {this.props.approved[id-1] && <img src={this.props.images[id-1]} alt="temp" style={{ width: "200px", height: "200px" ,left:'10px', marginTop: '5px', position:'absolute'}}></img>}
                          {this.props.approved[id-1] && <div style={{ float: "right", marginRight: "10px", marginTop: "210px" }}>{this.props.likes[id-1]}</div>}
                          {this.props.approved[id-1] && <div style={{ float: "right", marginRight: "5px", marginTop: "210px" }}>❤️</div>}
                          {this.props.approved[id-1] && <div style={{ float: "right", marginRight: "10px", marginTop: "210px" }}>{parseInt(this.props.prices[id-1]._hex, 16)}</div>}
                          {this.props.approved[id-1] && <img style={{ float: "right", height: "20px", width: "auto", marginRight: "5px", marginTop: "210px" }} src="../images/eth.png" alt="eth"></img>}
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
    
    export default OrderByCreation;