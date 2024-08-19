import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css'; // Certifique-se de adicionar seu CSS

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('@user'); // Remove o item do localStorage
    navigate('/'); // Redireciona para a página de login
    window.location.reload();
  };

  return (
    <div className="home-container">
      <h1>Bem-vindo à Página Inicial</h1>
      <button onClick={handleLogout} className="logout-button">
        Sair
      </button>
    </div>
  );
}

export default Home;


