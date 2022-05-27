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
                    <img src={this.props.images[this.props.id]} alt="Ako" width="600px" height="600px" />
                </div>

                <div className="page_right">
                    <br /><br /><br />
                    <h1>{this.props.names[this.props.id]}</h1>
                    <h3 style={{textDecoration:"underline",marginTop:"5%"}}>Description</h3>
                    <div className="description_box">
                        {this.props.descriptions[this.props.id]}
                    </div>
                    
                    &nbsp;
                    <div style={{fontSize:"40px",marginBottom:"5%"}}><img src="./images/eth.png" alt='eth-icon' width="auto" height="40px" />&nbsp;{this.props.price}</div>
                    {<div><span role="img" aria-label="heart">❤️</span> {this.props.likes[this.props.id]}</div>}
                    {(this.props.owners[this.props.id] !== this.props.account) && <button className="likeBtn" onClick={() => {
                        this.plusLike(this.props.id + 1)
                        window.location.replace("/Market")
                    }

                    }>좋아요</button>}


                    &nbsp;
                    {(this.props.approved[this.props.id]===true)&&(this.props.owners[this.props.id] !== this.props.account) &&<button onClick={() => {
                        this.props.buy(this.props.id + 1)
                    }}>구매</button>}

{(this.props.owners[this.props.id] === this.props.account) &&<input type='text' onChange={(e)=>price=e.target.value}></input>}

{(this.props.approved[this.props.id]===false)&&(this.props.owners[this.props.id] === this.props.account) &&<button onClick={() => {
                        this.props.sell(this.props.id + 1, price )
                    }}>판매</button>}



{(this.props.approved[this.props.id]===true)&&(this.props.owners[this.props.id] === this.props.account) &&<button onClick={() => {
                        this.props.changePrice(this.props.id + 1, price )
                    }}>가격 변경</button>}


{(this.props.approved[this.props.id]===true)&&(this.props.owners[this.props.id] === this.props.account) &&<button onClick={() => {
                        this.props.sellCancel(this.props.id + 1)
                    }}>판매 취소</button>}

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