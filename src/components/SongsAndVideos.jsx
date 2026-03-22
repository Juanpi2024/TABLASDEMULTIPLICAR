import React from 'react';

const SongsAndVideos = ({ onBack }) => {
  return (
    <div className="card" style={{ maxWidth: '700px', width: '100%', padding: '30px' }}>
      <h2 style={{ marginBottom: '10px', color: 'var(--primary)', fontSize: '2.5rem' }}>🎵 Canciones y Videos</h2>
      <p style={{ marginBottom: '30px', fontSize: '1.2rem' }}>
        Aprende el ritmo de las matemáticas. ¡Canta, baila y memoriza!
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginBottom: '30px' }}>
        
        <div>
          <h3 style={{ marginBottom: '10px', fontSize: '1.4rem', color: 'var(--secondary)' }}>
            👶 Para los más pequeños (Infantil)
          </h3>
          <a href="https://www.youtube.com/results?search_query=canciones+infantiles+tablas+de+multiplicar" target="_blank" rel="noreferrer" style={{ display: 'block', padding: '40px', background: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)', borderRadius: '15px', textDecoration: 'none', color: '#333', textAlign: 'center', boxShadow: 'var(--shadow-md)', marginBottom: '20px', transition: 'transform 0.2s' }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '10px' }}>👶📺</span>
            <h3 style={{ margin: 0 }}>Abrir Canciones en YouTube</h3>
            <p style={{ margin: '5px 0 0 0', opacity: 0.8 }}>Ver todos los videos recomendados para niños pequeños</p>
          </a>
        </div>

        <div>
          <h3 style={{ marginBottom: '10px', fontSize: '1.4rem', color: '#E67E22' }}>
            🎧 Rap y Ritmos Urbanos
          </h3>
          <a href="https://www.youtube.com/results?search_query=rap+tablas+de+multiplicar+educativo" target="_blank" rel="noreferrer" style={{ display: 'block', padding: '40px', background: 'linear-gradient(135deg, #F6D365 0%, #FDA085 100%)', borderRadius: '15px', textDecoration: 'none', color: '#fff', textAlign: 'center', boxShadow: 'var(--shadow-md)', marginBottom: '20px', transition: 'transform 0.2s' }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '10px' }}>🎧📺</span>
            <h3 style={{ margin: 0 }}>Abrir Raps en YouTube</h3>
            <p style={{ margin: '5px 0 0 0', opacity: 0.9 }}>Escuchar ritmos urbanos con las tablas de multiplicar</p>
          </a>
        </div>

        <div>
          <h3 style={{ marginBottom: '10px', fontSize: '1.4rem', color: '#16A085' }}>
            🐸 Clásicos de Cachureos (Chile)
          </h3>
          <p style={{ marginBottom: '15px', color: 'var(--text-dark)' }}>
            Selecciona la tabla que quieres practicar con las canciones originales:
          </p>
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '15px' }}>
            {[2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <a 
                key={num}
                href={`https://www.youtube.com/results?search_query=tabla+del+${num}+cachureos+karaoke`}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: 'var(--primary)',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '20px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                Tabla del {num}
              </a>
            ))}
          </div>
          
          <a href="https://www.youtube.com/results?search_query=cachureos+tablas+de+multiplicar+karaoke" target="_blank" rel="noreferrer" style={{ display: 'block', padding: '30px', background: 'linear-gradient(135deg, #84FAB0 0%, #8FD3F4 100%)', borderRadius: '15px', textDecoration: 'none', color: '#2c3e50', textAlign: 'center', boxShadow: 'var(--shadow-md)', marginTop: '20px', transition: 'transform 0.2s' }}>
            <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '10px' }}>🐸📺</span>
            <h4 style={{ margin: 0, fontSize: '1.2rem' }}>Ver Lista de Reproducción de Cachureos</h4>
          </a>
        </div>

      </div>

      <button className="secondary" style={{ width: '100%' }} onClick={onBack}>Volver al Menú</button>
    </div>
  );
};

export default SongsAndVideos;
