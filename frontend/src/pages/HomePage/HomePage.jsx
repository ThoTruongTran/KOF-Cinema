import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePageStyle.css';
const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [activeTab, setActiveTab] = useState(1);
    const [selectedMovie, setSelectedMovie] = useState(null); 
    useEffect(() => {
        axios.get('http://localhost:8080/api/movies')
            .then(response => { setMovies(response.data); })
            .catch(error => { console.error("Lỗi khi lấy dữ liệu phim:", error); });
    }, []);

    // Hàm chuyển đổi URL YouTube thông thường thành URL nhúng (embed)
    const getEmbedUrl = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}?autoplay=1` : null;
    };

    const filteredMovies = movies.filter(movie => {
        if (activeTab === 1) return movie.status === 'NOW_SHOWING';
        if (activeTab === 2) return movie.status === 'COMING_SOON';
        return false;
    });

    return (
        <div className="movie-section">
            {/* Hệ thống Tab giữ nguyên */}
            <div className="tab-container">
                <button 
                    className={activeTab === 1 ? "tab-btn active" : "tab-btn"} 
                    onClick={() => setActiveTab(1)}
                >
                    PHIM ĐANG CHIẾU
                </button>
                <button 
                    className={activeTab === 2 ? "tab-btn active" : "tab-btn"} 
                    onClick={() => setActiveTab(2)}
                >
                    PHIM SẮP CHIẾU
                </button>
            </div>
            <div className="movie-grid">
                {filteredMovies.map(movie => (
                    <div key={movie.movie_id} className="movie-card">
                        <div className="poster-wrap">
                            <img 
                                src={new URL(`../../assets/${movie.poster_url}`, import.meta.url).href}
                                alt={movie.title}
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/200x300?text=No+Image'; }}
                            />
                        </div>
                        <h3>{movie.title}</h3>
                        <p>{movie.genre}</p>
                        
                        {/* Thêm nút Xem Trailer riêng biệt */}
                        <div className="card-buttons">
                            <button 
                                className="btn-trailer" 
                                onClick={() => setSelectedMovie(movie)}
                            >
                                XEM TRAILER
                            </button>
                            <button className="btn-buy">MUA VÉ</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL TRAILER CĂN GIỮA GIỐNG BETA CINEMAS */}
            {selectedMovie && (
                <div className="trailer-modal-overlay" onClick={() => setSelectedMovie(null)}>
                    <div className="beta-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>TRAILER - {selectedMovie.title.toUpperCase()}</h2>
                            <button className="beta-close-btn" onClick={() => setSelectedMovie(null)}>&times;</button>
                        </div>
                        <div className="video-wrapper">
                            <iframe
                                src={getEmbedUrl(selectedMovie.trailer_url)}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;