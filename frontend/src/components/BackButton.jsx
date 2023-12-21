import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import '../Styles/BackButton.css'; // Import the new stylesheet

const BackButton = ({ destination }) => {
  return (
    <div className='back-button-container'>
      <Link to={destination} className='back-button'>
        <div >
          <BsArrowLeft className='arrow-icon' />
        </div>
      </Link>
    </div>
  );
};

export default BackButton;
