import React from 'react';
import '../styles/Card.css'
import Cycling from '../images/Cycling.svg';
import { useEffect, useState } from 'react';

const Card = (props) => {
  const [isVisible, setIsVisible] = useState(true);

    const handleResize = () => {
        if (window.innerWidth <= 600) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
    };

    useEffect(() => {
        if (window.innerWidth <= 600) {
            setIsVisible(false);
        }
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
        };
    }, []);


  return (
    <div className='cardContainer' >
      <img id='cardImg' src={props.image} alt={props.alt}/>
      <div id='cardContent'>
        <div id='cardContentHeader'>
          <h4>{props.tittle}</h4>
          {isVisible && <h5 id='cardPrice'>{props.price}</h5>}
        </div>
        <div id='cardDescription'>
          <h6>{props.description}</h6>
        </div>
        <div id='cardContentFooter'>
          {isVisible && <h5>Order a delivery</h5>}
          {isVisible && <img id='cardFooterLogo' src={Cycling} alt='cardFooterLogo'/>}
          {!isVisible && <h5 id='cardPrice'>{props.price}</h5>}
        </div>
      </div>
    </div>
  );
}

export default Card;