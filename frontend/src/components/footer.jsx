import React from 'react';

const Footer = () => {
  const footerStyle = {
    backgroundColor: 'white',
    color: 'black',
    padding: '10px',
    textAlign: 'center',
    borderTop: '1px solid #ccc',
    width: '100%',
    position: 'fixed',
    bottom: 0,
  };

  return (
    <footer style={footerStyle}>
      <p style={{ margin: 0 }}>
        © 2023 Procurement Management System - Faculty of Engineering - University of R. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
