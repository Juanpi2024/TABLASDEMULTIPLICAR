import React from 'react';

const typeLabels = {
  add: 'Suma',
  sub: 'Resta',
  mult: 'Multiplicación Aleatoria'
};

const StatsDashboard = ({ onBack, stats }) => {
  const statsEntries = Object.entries(stats).sort(([keyA], [keyB]) => {
    // Sort tables first (e.g. x2, x3), then others
    const isTableA = keyA.startsWith('x');
    const isTableB = keyB.startsWith('x');
    if (isTableA && !isTableB) return -1;
    if (!isTableA && isTableB) return 1;
    if (isTableA && isTableB) {
      return parseInt(keyA.substring(1)) - parseInt(keyB.substring(1));
    }
    return keyA.localeCompare(keyB);
  });

  const getAccuracyColor = (pct) => {
    if (pct >= 90) return 'var(--success)';
    if (pct >= 70) return '#F39C12'; // Orange/Yellow
    return 'var(--danger)';
  };

  return (
    <div className="card" style={{ maxWidth: '600px', width: '100%', padding: '30px' }}>
      <h2 style={{ marginBottom: '20px', color: 'var(--primary)', fontSize: '2.5rem' }}>📊 Tus Estadísticas</h2>
      
      {statsEntries.length === 0 ? (
        <p style={{ fontSize: '1.2rem', margin: '40px 0' }}>Aún no hay datos. ¡Juega un poco para ver tus estadísticas aquí!</p>
      ) : (
        <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '20px', paddingRight: '10px' }}>
          {statsEntries.map(([key, data]) => {
            const accuracy = Math.round((data.correct / data.total) * 100);
            const label = key.startsWith('x') ? `Tabla del ${key.substring(1)}` : (typeLabels[key] || key);
            
            return (
              <div 
                key={key} 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  background: 'rgba(0,0,0,0.03)',
                  padding: '15px 20px',
                  borderRadius: '12px',
                  marginBottom: '10px'
                }}
              >
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                  {label}
                </div>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <div style={{ fontSize: '1rem', color: '#7f8c8d' }}>
                    {data.correct} / {data.total}
                  </div>
                  <div style={{ 
                    fontSize: '1.4rem', 
                    fontWeight: '900', 
                    color: getAccuracyColor(accuracy),
                    width: '60px',
                    textAlign: 'right'
                  }}>
                    {accuracy}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <button className="secondary" style={{ width: '100%' }} onClick={onBack}>Volver al Menú</button>
    </div>
  );
};

export default StatsDashboard;
