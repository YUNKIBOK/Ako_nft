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
                <h1>상세페이지</h1>
                <div className="page_left">
                    <h2>{this.props.names[this.props.id]}</h2>
                    <img src={this.props.images[this.props.id]} alt="Ako" width="250" height="250" />
                    <br />
                    <hr className="line"></hr>
                    current price<br />
                </div>

                <div className="page_right">
                    <br /><br /><br />
                    <h3>Description</h3>
                    <div className="description_box">
                        {this.props.descriptions[this.props.id]}
                    </div>
                    <br />
                </div>


                <div className="price">
                    <img src="./images/eth.png" alt='eth-icon' width="15" height="25" />
                    &nbsp;
                    {this.props.price}
                </div>

                <div className="buy">
                    {(this.props.owners[this.props.id] !== this.props.account) && <button onClick={() => {
                        this.plusLike(this.props.id + 1)
                    }

                    }><span role={'img'}>❤️</span>좋아요</button>}


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