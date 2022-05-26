import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './OrderByLikes.css';



class OrderByLikes extends Component {

        
    
      

    render() {

        return (
          <div>
            <h3>OrderByLikes 임시 페이지입니다.</h3>
            <div className="row text-center" style={{ height: '700px' }}>
              {this.props.orderByLikesid.map((id, key) => { 
                return (
                    this.props.approved[id-1] && <div key={key} className="col-md-2 mb-3">
                    <Link to="/Detail">
                      <div onClick={() => {
                        this.props.idUpdate(id-1)
                        this.props.priceUpdate(id-1)
                      }}>
                        <div>
                        {this.props.approved[id-1] && <img src={this.props.images[id-1]} alt="temp" style={{ width: "200px", height: "200px" ,left:'50px', position:'absolute'}}></img>}
                        </div>
    
                        <div style={{ width: "200px", height: "30px", background: "gainsboro", left:'50px', top:'200px',position:'absolute'}}>
                          {this.props.approved[id-1] && <p style={{ float: "left", marginLeft: "10px", marginTop: "3px" }}>{this.props.names[id-1]}</p>}
                          {this.props.approved[id-1] && <p style={{ float: "right", marginRight: "10px", marginTop: "3px" }}>{this.props.likes[id-1]}</p>}
                          {this.props.approved[id-1] && <p style={{ float: "right", marginRight: "5px", marginTop: "3px" }}>❤️</p>}
                          {this.props.approved[id-1] && <p style={{ float: "right", marginRight: "10px", marginTop: "3px" }}>{parseInt(this.props.prices[id-1]._hex, 16)}</p>}
                          {this.props.approved[id-1] && <img style={{ float: "right", height: "20px", width: "auto", marginRight: "5px", marginTop: "3px" }} src="./images/eth.png" alt="eth"></img>}
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

export default OrderByLikes;