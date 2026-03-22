import React, { useState, useEffect } from 'react';
import './index.css';
import Menu from './components/Menu';
import MultiplicationTables from './components/MultiplicationTables';
import MentalChallenge from './components/MentalChallenge';
import StatsDashboard from './components/StatsDashboard';
import SongsAndVideos from './components/SongsAndVideos';

function App() {
  const [currentView, setCurrentView] = useState('menu');
  const [globalScore, setGlobalScore] = useState(() => {
    const saved = localStorage.getItem('globalScore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('streak');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('stats');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('globalScore', globalScore.toString());
  }, [globalScore]);

  useEffect(() => {
    localStorage.setItem('streak', streak.toString());
  }, [streak]);

  useEffect(() => {
    localStorage.setItem('stats', JSON.stringify(stats));
  }, [stats]);

  const level = Math.floor(globalScore / 500) + 1;

  const handleAddPoints = (basePoints) => {
    const multiplier = streak >= 3 ? Math.min(Math.floor(streak / 3) + 1, 5) : 1;
    setGlobalScore(prev => prev + (basePoints * multiplier));
    setStreak(prev => prev + 1);
  };

  const handleError = () => {
    setStreak(0);
  };

  const recordAnswer = (type, isCorrect) => {
    setStats(prev => {
      const current = prev[type] || { correct: 0, total: 0 };
      return {
        ...prev,
        [type]: {
          correct: current.correct + (isCorrect ? 1 : 0),
          total: current.total + 1
        }
      };
    });
  };

  const renderView = () => {
    switch (currentView) {
      case 'tables':
        return <MultiplicationTables 
                 onBack={() => setCurrentView('menu')} 
                 onAddPoints={handleAddPoints}
                 onError={handleError}
                 streak={streak}
                 recordAnswer={recordAnswer}
               />;
      case 'challenge':
        return <MentalChallenge 
                 onBack={() => setCurrentView('menu')} 
                 onAddPoints={handleAddPoints}
                 onError={handleError}
                 streak={streak}
                 recordAnswer={recordAnswer}
               />;
      case 'dashboard':
        return <StatsDashboard 
                 onBack={() => setCurrentView('menu')} 
                 stats={stats}
               />;
      case 'videos':
        return <SongsAndVideos 
                 onBack={() => setCurrentView('menu')} 
               />;
      default:
        return <Menu onSelect={setCurrentView} />;
    }
  };

  return (
    <div className="app-container">
      <div className="top-bar">
        <div className="top-bar-item level-badge">Nivel {level}</div>
        <div className="top-bar-item score-display">⭐ {globalScore}</div>
        <div className={`top-bar-item streak-display ${streak >= 3 ? 'streak-active' : ''}`}>
          🔥 x{streak}
        </div>
      </div>
      {renderView()}
    </div>
  );
}

export default App;
