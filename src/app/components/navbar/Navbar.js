"use client"

import '../../css/Navbar.css';
import { FaSearch, FaCalendarAlt, FaUserFriends, FaList } from 'react-icons/fa';

const Navbar = () => {

  return (
      <div className="search-bar">
        <div className="search-section">
          <FaSearch className="icon" />
        </div>
      </div>
  );
};

export default Navbar;
