import React, { useState, useEffect } from 'react';
import './App.css';

// Statik kullanıcı adı ve şifre
const userCredentials = {
  username: "şıla",
  password: "123456"
};

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // localStorage'dan tıklama verisini ve son tıklama zamanını al
    const storedClicks = localStorage.getItem('clicks');
    const storedLastClick = localStorage.getItem('lastClickTime');
    
    if (storedClicks) {
      setClicks(Number(storedClicks));
    }
    
    if (storedLastClick) {
      setLastClickTime(Number(storedLastClick));
    }
  }, []);

  useEffect(() => {
    // Her değişiklikte veriyi localStorage'a kaydet
    localStorage.setItem('clicks', clicks);
    localStorage.setItem('lastClickTime', lastClickTime);
  }, [clicks, lastClickTime]);

  const handleLogin = () => {
    if (username === userCredentials.username && password === userCredentials.password) {
      setIsLoggedIn(true);
    } else {
      alert("Yanlış kullanıcı adı veya şifre");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setClicks(0);
    setMessage("");
  };

  const handleClickHeart = () => {
    const currentTime = Date.now();
    const timeElapsed = currentTime - lastClickTime;

    // Eğer 24 saatten fazla zaman geçtiyse, kalp sıfırlanır
    if (timeElapsed > 24 * 60 * 60 * 1000) {
      setClicks(0);
      setMessage("Kalp kırıldı! Yeniden tıklamak için 24 saat bekleyin.");
      return;
    }

    // 12 saat beklemesi gerekiyorsa, uyarı ver
    if (timeElapsed < 12 * 60 * 60 * 1000 && clicks >= 10) {
      setMessage("Bugün yeterince sevgi alındı. Lütfen 12 saat bekleyin.");
      return;
    }

    // Eğer tıklama sayısı 10'a ulaşmamışsa, tıklama yapılabilir
    if (clicks < 10) {
      setClicks(prev => prev + 1);
      setLastClickTime(currentTime);
      setMessage("");
    }

    // Eğer tıklama sayısı 10'a ulaştıysa, uyarı ver
    if (clicks === 9) {
      setMessage("Bugün yeterince sevgi alındı, 12 saat sonra tekrar gelin.");
    }
  };

  return (
    <div className="App">
      <h1>Kalp Sevgi Projesi</h1>
      {!isLoggedIn ? (
        <div>
          <input
            type="text"
            placeholder="Kullanıcı adı"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Giriş Yap</button>
        </div>
      ) : (
        <div>
          <h2>Hoş geldiniz, {username}</h2>
          <button onClick={handleLogout}>Çıkış Yap</button>
          <div className="heart-container">
            <button className="heart-button" onClick={handleClickHeart}>
              ❤️
            </button>
            <p className="clicks-count">{clicks} / 10</p>
            <p className="message">{message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
