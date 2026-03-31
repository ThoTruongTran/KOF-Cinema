import React, { useState, useEffect } from 'react';
import './NavStyle.css'; 
import logoImg from '../../assets/logo.png';
import { Link, useLocation } from 'react-router-dom';
// Import icon từ thư viện (ví dụ font-awesome hoặc react-icons)
import { FaUserCircle } from 'react-icons/fa'; 

function NavMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  // Kiểm tra trạng thái đăng nhập mỗi khi chuyển trang hoặc component mount
useEffect(() => {
    // Kiểm tra trạng thái mỗi khi URL thay đổi
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user); 
  }, [location]);

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Phần Logo */}
        <div className="nav-logo">
          <Link to="/Rap-phim">
            <img src={logoImg} alt="Logo" className="logo-image" />
          </Link>
        </div>

        {/* Phần Menu đường dẫn */}
        <ul className="nav-links">
          <li><Link to="/Rap-phim">Rạp phim</Link></li>
          <li><Link to="/lich-chieu">Lịch Chiếu</Link></li>
          <li><Link to="/gia-ve">Giá Vé</Link></li>
          <li><Link to="/phim">Phim</Link></li>
          <li><Link to="/khuyen-mai">Khuyến mãi</Link></li>
          <li><Link to="/user">Nguoi dung</Link></li>
          {/* <li><Link to="/user">Người dùng</Link></li> */}
        </ul>

        {/* Phần thay đổi nút Đăng nhập / Icon User */}
        <div className="nav-auth">
          {isLoggedIn ? (
            <Link to="/user" className="user-icon-link">
              <FaUserCircle className="user-nav-icon" />
            </Link>
          ) : (
            <Link to="/login">
              <button className="btn-login">Đăng Nhập</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavMenu;