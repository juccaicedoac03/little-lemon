import React from 'react';
import '../styles/Card.css'

const Card = (props) => {
  return (
    <div className='cardContainer' >
      <img id='cardImg' src={props.image} alt={props.alt}/>
      <div id='cardContainer'>
        <div id='cardContentHeader'>
          <h4>{props.tittle}</h4>
          <h5 id='cardPrice'>{props.price}</h5>
        </div>
        <div id='cardDescription'>
          <h6>{props.description}</h6>
        </div>
        <div id='cardContentFooter'>
          <h5>Order a delivery</h5>
        </div>
      </div>
    </div>
  );
}

export default Card;