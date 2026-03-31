import React, { useState, useEffect } from 'react';
import { Lucid, Blockfrost } from 'lucid-cardano';
import './style.css';

function KhuyenMai() {
    const [lucid, setLucid] = useState(null);
    const [walletAddr, setWalletAddr] = useState("");
    const [loading, setLoading] = useState(false);

    // 1. Tự động kết nối ví ngay khi vào trang
    useEffect(() => {
        const autoConnect = async () => {
            try {
                const l = await Lucid.new(
                    new Blockfrost(
                        "https://cardano-preview.blockfrost.io/api/v0", 
                        "previewYo2MqgqvZgJC8L6HW9p8YVnV2LYrVaSQ" 
                    ),
                    "Preview",
                );
                setLucid(l);

                const walletName = 'eternl'; // Ưu tiên Eternl
                if (window.cardano && window.cardano[walletName]) {
                    const api = await window.cardano[walletName].enable();
                    l.selectWallet(api);
                    const addr = await l.wallet.address();
                    setWalletAddr(addr);
                }
            } catch (err) {
                console.error("Lỗi kết nối ví:", err);
            }
        };
        autoConnect();
    }, []);

    // 2. Hàm mua vé bằng tADA (Người dùng gửi tADA cho rạp phim)
    const buyTicketWithTADA = async () => {
        if (!lucid || !walletAddr) return;

        try {
            setLoading(true);
            const ticketPriceADA = 10; // Giả định giá vé là 10 tADA
            const cinemaAddress = "addr_test1vpf99026v5nllm7ry2s6x0p4m0c29xuj8m70e8v6a386vugq3e8z6"; // Thay bằng ví nhận tiền của bạn

            // Tạo giao dịch thanh toán
            const tx = await lucid.newTx()
                .payToAddress(cinemaAddress, { lovelace: BigInt(ticketPriceADA * 1000000) })
                .complete();

            // Người dùng ký tên xác nhận thanh toán
            const signedTx = await tx.sign().complete();
            const txHash = await signedTx.submit();

            alert(`Thanh toán thành công! \nMã giao dịch: ${txHash}\nBạn đã mua vé bằng 10 tADA.`);
            
            // Ở đây bạn có thể gọi API Backend để lưu trạng thái "Đã thanh toán" cho Ticket
        } catch (error) {
            console.error("Lỗi thanh toán:", error);
            alert("Thanh toán bị hủy hoặc thất bại.");
        } finally {
            setLoading(false);
        }
    };
    async function claimReward() {
        if (!walletAddr || !lucid) return;

        try {
            setLoading(true);
            const rewardAmount = 1;
            const adminSeed = "enable moment educate sense sponsor casual twist rapid almost announce allow floor slab imitate finger poem stool attack original pledge head physical demand alley"; 
            
            // Lưu lại ví người dùng để gửi tới
            const userAddr = walletAddr;

            // Switch sang ví Admin để ký giao dịch
            lucid.selectWalletFromSeed(adminSeed);

            const tx = await lucid.newTx()
                .payToAddress(userAddr, { lovelace: BigInt(rewardAmount * 1000000) })
                .complete();

            const signedTx = await tx.sign().complete();
            const txHash = await signedTx.submit();

            alert(`Thành công! tADA đang được gửi đến ví của bạn.\nHash: ${txHash}`);
        } catch (error) {
            console.error("Lỗi:", error);
            alert("Giao dịch thất bại.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="promo-page">
            <section className="promo-hero">
                <div className="hero-content">
                    <h1>Web3 Cinema - Thanh toán Blockchain</h1>
                    
                    <div className="wallet-section">
                        {walletAddr ? (
                            <div className="reward-group">
                                <div className="status-box">
                                    <p>Đã kết nối: <strong>{walletAddr.slice(0, 10)}...{walletAddr.slice(-8)}</strong></p>
                                </div>

                                <div className="action-buttons">
                                    {/* Phần mua vé mới */}
                                    <div className="ticket-buy-box">
                                        <h3>Vé Phim Đặc Biệt (Combo Web3)</h3>
                                        <p>Giá ưu đãi: <span className="price-tag">50 tADA</span></p>
                                        <button 
                                            onClick={buyTicketWithTADA} 
                                            className="btn-claim"
                                            disabled={loading}
                                        >
                                            {loading ? "ĐANG XỬ LÝ..." : "MUA VÉ BẰNG tADA"}
                                        </button>
                                    </div>
                                    
                                    <hr />
                                    <p>Hoặc nhận quà tặng trải nghiệm:</p>
                                    <button 
                                       className="btn-claim"
                                       onClick={claimReward}
                                       >
                                        NHẬN 1 tADA FREE
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <p className="loading-text">Đang yêu cầu quyền truy cập ví Cardano...</p>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default KhuyenMai;