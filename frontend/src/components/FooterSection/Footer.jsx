import React from 'react';
import './FooterStyle.css';
// Bạn có thể import logo của mình vào đây nếu muốn để ở Footer
import logoImg from '../../assets/logo.png'; 

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Cột 1: Giới thiệu & Logo */}
        <div className="footer-column">
          <img src={logoImg} alt="Logo" className="footer-logo" />
          <p className="footer-desc">
            Hệ thống đặt vé xem phim trực tuyến hàng đầu, mang đến cho bạn những trải nghiệm điện ảnh tuyệt vời nhất.
          </p>
          <div className="social-icons">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-youtube"></i>
            <i className="fab fa-instagram"></i>
          </div>
        </div>

        {/* Cột 2: Cụm rạp */}
        <div className="footer-column">
          <h3>CỤM RẠP KOF</h3>
          <ul>
            <li><a href="#">KOF Cinema Ba Đình</a></li>
            <li><a href="#">KOF Cinema Cầu Giấy</a></li>
            <li><a href="#">KOF Cinema Thanh Xuân</a></li>
            <li><a href="#">KOF Cinema Hà Đông</a></li>
          </ul>
        </div>

        {/* Cột 3: Hỗ trợ & Dịch vụ */}
        <div className="footer-column">
          <h3>HỖ TRỢ</h3>
          <ul>
            <li><a href="#">Chính sách đổi trả hoàn tiền</a></li>
            <li><a href="#">Chính sách bảo mật</a></li>
            <li><a href="#">Điều khoản sử dụng</a></li>
            <li><a href="#">Câu hỏi thường gặp (F.A.Q)</a></li>
          </ul>
        </div>

        {/* Cột 4: Liên hệ */}
        <div className="footer-column">
          <h3>LIÊN HỆ</h3>
          <p><i className="fas fa-map-marker-alt"></i> Số 595, đường Giải Phóng, Hà Nội</p>
          <p><i className="fas fa-phone"></i> Hotline: 1900 6464</p>
          <p><i className="fas fa-envelope"></i> Email: contact@kofcinema.vn</p>
          <div className="app-download">
             {/* Bạn có thể thêm các nút App Store/Google Play ở đây */}
             <p className="download-text">TẢI ỨNG DỤNG</p>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2026 KOF CINEMA. All rights reserved. Designed by YourName.</p>
      </div>
    </footer>
  );
}

export default Footer;