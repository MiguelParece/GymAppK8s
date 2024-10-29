import React from 'react';
import './Footer.css'
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Gym App. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
