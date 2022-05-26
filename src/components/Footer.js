import React from "react";
import "./Footer.css"

function Footer(props){
    return (
        <footer>
            <h6 style={{width:"85%"}}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email: dearboksosa@gmail.com<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;instagram: @dearboksosa.com<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Copyright 2022. Boksosa all right reserved.
            </h6>

            <a href="https://www.dongguk.edu/main">
                <img src="../images/dongguk.png" alt="dongguk" style={{height:"8vh",width:"auto"}}></img>
            </a>
        </footer>
    );
}

export default Footer;