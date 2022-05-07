import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css"

const Home =(props) =>{
    return(
        <div style={{display:"grid"}}>
            <h3 style={{color:"dimgrey",marginLeft:"30px"}}>Start a whole new trade now.</h3>
            <div>
                <ul style={{listStyle:"none"}}>
                    <Link to="/Market"><li className={styles.homeLi}><img className={styles.icon} src="./images/temp.jpg" alt="Market"></img></li></Link>
                    <Link to="/Manage"><li className={styles.homeLi}><img className={styles.icon} src="./images/manage.png" alt="Manage"></img></li></Link>
                    <Link to="/Create"><li className={styles.homeLi}><img className={styles.icon} src="./images/create.png" alt="Create"></img></li></Link>
                </ul>
            </div>
            
            <div>
                <ul style={{listStyle:"none"}}>
                    <Link to="/Market"><li className={styles.homeLiBtnMar}>Market</li></Link>
                    <Link to="/Manage"><li className={styles.homeLiBtnMan}>Manage</li></Link>
                    <Link to="/Create"><li className={styles.homeLiBtnCre}>Create</li></Link>
                </ul>
            </div>
            
        </div>
    );
}

export default Home;