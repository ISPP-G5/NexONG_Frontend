// FamilyCard.js
import React from 'react';

const FamilyCard = ({ familyName, kidName }) => (
  <div className='card-info'>
    <div className='family-request'>
      <img src='https://via.placeholder.com/150' alt='placeholder' />
      <div className='family-info'>
        <p>{familyName}</p>
        <p>{kidName}</p>
      </div>
    </div>
  </div>
);

export default FamilyCard;