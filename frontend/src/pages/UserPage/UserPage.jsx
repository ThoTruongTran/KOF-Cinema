import React, { useState, useEffect } from "react";
import axios from "axios";
import { Lucid, Blockfrost } from 'lucid-cardano'; 
import { useNavigate } from "react-router-dom";
import './user-style.css';
const UserProfile = ({ userId = 1 }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // State cho Wallet
    const [walletAddr, setWalletAddr] = useState("");
    const [tAdaBalance, setTAdaBalance] = useState(0);
    const [lucid, setLucid] = useState(null);
    const navigate = useNavigate();
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const currentUserId = storedUser?.user_id || userId;

    // Hàm xử lý Đăng xuất
    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('accessToken')
        // Điều hướng về trang chủ và tải lại trang để Nav cập nhật
        navigate('/Rap-phim');  
        window.location.reload(); 
    };

    // 1. Lấy dữ liệu User từ Backend
    useEffect(() => {
        setLoading(true);
        // Sử dụng currentUserId thay vì userId cố định
        axios.get(`http://localhost:8080/api/users/${currentUserId}`)
         .then(response => {
            setUser(response.data);
            setLoading(false);
         })
         .catch(error => {
            console.error("Lỗi API:", error);
            setLoading(false);
         });
    }, [currentUserId]);
    // 2. Khởi tạo Lucid & Tự động kiểm tra ví đã kết nối
    useEffect(() => {
        const initWeb3 = async () => {
            try {
                const l = await Lucid.new(
                    new Blockfrost(
                        "https://cardano-preview.blockfrost.io/api/v0",
                        "previewYo2MqgqvZgJC8L6HW9p8YVnV2LYrVaSQ"
                    ),
                    "Preview",
                );
                setLucid(l);
                // Kiểm tra xem trình duyệt có ví nào đang "enabled" không (ví dụ: eternl)
                if (window.cardano && window.cardano.eternl) {
                    const api = await window.cardano.eternl.enable();
                    l.selectWallet(api);
                    const addr = await l.wallet.address();
                    setWalletAddr(addr);
                    const utxos = await l.wallet.getUtxos();
                    const totalLovelace = utxos.reduce((acc, utxo) => acc + utxo.assets.lovelace, 0n);
                    setTAdaBalance(Number(totalLovelace) / 1000000);
                }
            } catch (err) {
                console.log("Chưa kết nối ví hoặc lỗi Web3:", err);
            }
        };
        initWeb3();
    }, []);
    if (loading) return <div className="loader">Đang tải thông tin...</div>;
    if (!user) return <div className="error">Không tìm thấy người dùng!</div>;
    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <div className="avatar-circle">
                        {user.full_name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <h2>{user.full_name}</h2>
                    <button className="btn-logout-profile" onClick={handleLogout}>
                        Đăng xuất
                    </button>
                </div>
                <div className="profile-body">
                    <div className="info-grid">
                        <div className="info-group">
                            <label>Email</label>
                            <p>{user.email}</p>
                        </div>
                        <div className="info-group">
                            <label>Số điện thoại</label>
                            <p>{user.phone || "Chưa cập nhật"}</p>
                        </div>
                        <div className="info-group">
                            <label></label>
                            <p>{user.role}</p>
                        </div>
                    </div>
                    <div className="wallet-actions-section">
                        <div className="balance-and-button-group">
                            <div className="system-balance-info">
                                <label>Số dư hệ thống</label>
                                {/* Số dư VNĐ */}
                                <div className="balance-amount-small">
                                    <span className="balance-value">
                                        {user.total_balance?.toLocaleString() || '0'}
                                    </span>
                                    <span className="balance-currency">VNĐ</span>
                                </div>
                                {/* HIỂN THỊ SỐ DƯ tADA NGAY DƯỚI */}
                                <div className="balance-blockchain-small">
                                    <span className="ada-value">{tAdaBalance.toFixed(2)}</span>
                                    <span className="ada-currency">tADA</span>
                                </div>
                            </div>
                            <button className="btn-recharge-small">Nạp tiền vào ví</button>
                        </div>
                        <div className="action-buttons-group">
                            <div className="blockchain-wallet-card">
                                <div className="wallet-card-header">
                                    <strong>VÍ CARDANO (WEB3)</strong>
                                    <span className="network-badge">Preview</span>
                                </div>
                                <div className="wallet-card-address">
                                    <label>Địa chỉ đang kết nối:</label>
                                    <code>

                                        {walletAddr
                                            ? `${walletAddr.slice(0, 10)}...${walletAddr.slice(-8)}`
                                            : "Chưa kết nối ví"}
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default UserProfile;