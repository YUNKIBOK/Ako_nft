import React from "react";
import "./Footer.module.css"

function Footer(props){
    return (
        <footer>
            <h6 style={{float:"left",marginLeft:"50px"}}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email: dearboksosa@gmail.com<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;instagram: @dearboksosa.com<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Copyright 2022. Boksosa all right reserved.
            </h6>
            <a href="https://www.dongguk.edu/main">
                <img class='logo' src="./images/dongguk.png" alt="dongguk" style={{height:"50px",width:"auto",float:"right",marginRight:"30px"}}></img>
            </a>
        </footer>
    );
}

export default Footer;