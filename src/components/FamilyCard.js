// FamilyCard.js
import React from 'react';

const FamilyCard = ({ familyName, kidName }) => (
  <div className='card-info'>
    <div className='family-request'>
      <img src='https://images.hola.com/images/027f-178e051fb317-8ce95081f1b5-1000/horizontal-1200/padre-e-hijo.jpg' alt='placeholder' />
      <div className='family-info'>
        <p>{familyName}</p>
        <p>{kidName}</p>
      </div>
    </div>
  </div>
);

export default FamilyCard;