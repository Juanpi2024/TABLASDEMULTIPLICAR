import React from 'react';

const Menu = ({ onSelect }) => {
  return (
    <div className="card menu-card">
      <h1 className="title">✨ Mates Mágicas ✨</h1>
      <p className="mb-4" style={{ fontSize: '1.2rem', color: 'var(--text-dark)' }}>
        ¡Aprende las tablas y desafía tu mente!
      </p>
      
      <div className="flex-col">
        <button 
          className="primary" 
          onClick={() => onSelect('tables')}
        >
          ✖️ Aprender Tablas
        </button>
        
        <button 
          className="secondary" 
          onClick={() => onSelect('challenge')}
        >
          🧠 Desafío Mental
        </button>
        
        <button 
          className="accent" 
          onClick={() => onSelect('dashboard')}
          style={{ marginTop: '10px' }}
        >
          📊 Ver Estadísticas
        </button>
        
        <button 
          className="secondary" 
          onClick={() => onSelect('videos')}
          style={{ marginTop: '10px', backgroundColor: '#9B59B6', color: 'white' }}
        >
          🎵 Canciones y Videos
        </button>
      </div>
    </div>
  );
};

export default Menu;
