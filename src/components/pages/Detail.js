import React from "react";
import { Component } from 'react';
import './Detail.css';

var price=0;

class Detail extends Component {

    plusLike(tokenId) {
        const post = {
            id: tokenId,
        };
        fetch("http://localhost:3001/plus", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(post),
        })
            .then((res) => res.json())
            .then((json) => {
            });
    };

    render() {
        return (
            <div className="page_container">
                <div className="page_left">
                    <img src={this.props.images[this.props.id]} alt="Ako" width="80%" height="auto" style={{ borderRadius: "10%"}}/>
                </div>

                <div className="page_right">
                    <br /><br /><br />
                    <h1>#{this.props.id+1}</h1>
                    <pre style={{ fontSize: "xx-large", width: "60%"}}>{this.props.names[this.props.id]}</pre>
                    <div className="description_box">
                        {this.props.descriptions[this.props.id]}
                    </div>
                    
                    &nbsp;
                    <div style={{fontSize:"40px",marginBottom:"3%"}}><img src="./images/eth.png" alt='eth-icon' width="auto" height="40px" />&nbsp;{this.props.price}<span role="img" aria-label="heart" style={{fontSize:"40px",marginLeft:"3%"}}>❤️</span>{this.props.likes[this.props.id]}</div>
                    
                    {(this.props.approved[this.props.id]===true)&&(this.props.owners[this.props.id] !== this.props.account) &&<button className="buyBtn" onClick={() => {
                        this.props.buy(this.props.id + 1)
                    }}>Buy</button>}

                    {(this.props.owners[this.props.id] !== this.props.account) && <button className="likeBtn" onClick={() => {
                        this.plusLike(this.props.id + 1)
                        window.location.replace("/Market/OrderByLikes")
                    }

                    }>Like it!</button>}

                    {(this.props.owners[this.props.id] === this.props.account) &&<input type='text' onChange={(e)=>price=e.target.value}></input>}
                    
                    &nbsp;
                    {(this.props.approved[this.props.id]===true)&&(this.props.owners[this.props.id] === this.props.account) &&<button className="buyBtn" onClick={() => {
                        this.props.changePrice(this.props.id + 1, price )
                    }}>Change price</button>}

                    &nbsp;&nbsp;&nbsp;
                    {(this.props.approved[this.props.id]===true)&&(this.props.owners[this.props.id] === this.props.account) &&<button className="cancleBtn" onClick={() => {
                        this.props.sellCancel(this.props.id + 1)
                    }}>Cancel listing</button>}

                    &nbsp;
                    {(this.props.approved[this.props.id]===false)&&(this.props.owners[this.props.id] === this.props.account) &&<button className="buyBtn" onClick={() => {
                        this.props.sell(this.props.id + 1, price )
                    }}>Sell</button>}
                </div>

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