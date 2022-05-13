import { Link } from "react-router-dom";
import "./Home.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { Component } from "react";
import Slider from "react-slick";

export default class Home extends Component {
    
    render() {
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        dotsClass: "slick-dots",
        arrows: true
      };
      
      return(
        <div style={{display:"grid"}}>
            <h3 style={{color:"dimgrey",marginLeft:"30px"}}>Start a whole new trade now.</h3>
            <div className="container" style={{border:"white"}}>
                    <div className="box">
                        <Slider {...settings} >
                            <div className="circle">
                                <img src="https://gateway.pinata.cloud/ipfs/QmV3pjVvja23HvKj7FHzzJDkeGevtzy4pJ9YtPytC4xdP8/1.png" alt="rank1" width="200px" height="200px"/>
                            </div>
                            <div className="circle">
                                <img src="https://gateway.pinata.cloud/ipfs/QmV3pjVvja23HvKj7FHzzJDkeGevtzy4pJ9YtPytC4xdP8/2.png" alt="rank2" width="200" height="200"/>
                            </div>
                            <div className="circle">
                                <img src="https://gateway.pinata.cloud/ipfs/QmV3pjVvja23HvKj7FHzzJDkeGevtzy4pJ9YtPytC4xdP8/3.png" alt="rank3" width="200" height="200"/>
                            </div>
                            <div className="circle">
                                <img src="https://gateway.pinata.cloud/ipfs/QmV3pjVvja23HvKj7FHzzJDkeGevtzy4pJ9YtPytC4xdP8/4.png" alt="rank4" width="200" height="200"/>
                            </div>
                            <div className="circle">
                                <img src="https://gateway.pinata.cloud/ipfs/QmV3pjVvja23HvKj7FHzzJDkeGevtzy4pJ9YtPytC4xdP8/5.png" alt="rank5" width="200" height="200"/>
                            </div>
                        </Slider>
                            <br/><br/>
                            <Link to="/Market" className="homeBtn">Market</Link>
                    </div>
                    <div className="box">
                            <Link to="/Manage"><img style={{width:"30vh",height:"30vh"}} src="./images/manage.png" alt="Manage"></img></Link>
                            <br/><br/>
                            <Link to="/Manage" className="homeBtn">Manage</Link>
                    </div>
                    <div className="box">
                            <Link to="/Create"><img style={{width:"30vh",height:"30vh"}} src="./images/create.png" alt="Create"></img></Link>
                            <br/><br/>
                            <Link to="/Create" className="homeBtn">Create</Link>
                    </div>
            </div>
        </div>
    );
    }
  }