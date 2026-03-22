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
            👶 Para los más peques (Infantil)
          </h3>
          <div style={{ position: 'relative', overflow: 'hidden', paddingTop: '56.25%', borderRadius: '15px', boxShadow: 'var(--shadow-md)' }}>
            <iframe 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
              src="https://www.youtube.com/embed?listType=search&list=canciones+infantiles+tablas+de+multiplicar" 
              title="YouTube video player" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '10px', fontSize: '1.4rem', color: '#E67E22' }}>
            🎧 Rap y Ritmos Urbanos
          </h3>
          <div style={{ position: 'relative', overflow: 'hidden', paddingTop: '56.25%', borderRadius: '15px', boxShadow: 'var(--shadow-md)' }}>
            <iframe 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
              src="https://www.youtube.com/embed?listType=search&list=rap+tablas+de+multiplicar+educativo" 
              title="YouTube video player" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
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
          <div style={{ position: 'relative', overflow: 'hidden', paddingTop: '56.25%', borderRadius: '15px', boxShadow: 'var(--shadow-md)', marginTop: '10px' }}>
            <iframe 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
              src="https://www.youtube.com/embed?listType=search&list=cachureos+tablas+de+multiplicar+karaoke" 
              title="YouTube video player Cachureos" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
        </div>

      </div>

      <button className="secondary" style={{ width: '100%' }} onClick={onBack}>Volver al Menú</button>
    </div>
  );
};

export default SongsAndVideos;
