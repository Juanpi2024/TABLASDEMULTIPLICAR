import React, { useState, useEffect } from 'react';

const MentalChallenge = ({ onBack, onAddPoints, onError, streak, recordAnswer }) => {
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds challenge
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const generateQuestion = () => {
    const types = ['add', 'sub', 'mult'];
    const type = types[Math.floor(Math.random() * types.length)];
    let num1, num2, answer, symbol;

    if (type === 'add') {
       num1 = Math.floor(Math.random() * 50) + 10;
       num2 = Math.floor(Math.random() * 50) + 10;
       answer = num1 + num2;
       symbol = '+';
    } else if (type === 'sub') {
       num1 = Math.floor(Math.random() * 50) + 20;
       num2 = Math.floor(Math.random() * num1) + 1; // Ensure positive result
       answer = num1 - num2;
       symbol = '-';
    } else {
       num1 = Math.floor(Math.random() * 10) + 2;
       num2 = Math.floor(Math.random() * 10) + 2;
       answer = num1 * num2;
       symbol = 'x';
    }

    // Options
    let options = [answer];
    while(options.length < 4) {
      let offset = Math.floor(Math.random() * 10) + 1;
      let wrongAns = Math.random() > 0.5 ? answer + offset : answer - offset;
      if (wrongAns > 0 && !options.includes(wrongAns)) {
        options.push(wrongAns);
      }
    }

    // Fisher-Yates shuffle algorithm
    for (let k = options.length - 1; k > 0; k--) {
      const j = Math.floor(Math.random() * (k + 1));
      [options[k], options[j]] = [options[j], options[k]];
    }

    setQuestion({ type, num1, num2, symbol, answer, options });
  };

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(60);
    generateQuestion();
  };

  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const handleAnswer = (ans) => {
    const isCorrect = ans === question.answer;
    if (recordAnswer) recordAnswer(question.type, isCorrect);

    if (isCorrect) {
      setFeedback('correct');
      const multiplier = streak >= 3 ? Math.min(Math.floor(streak / 3) + 1, 5) : 1;
      setScore(s => s + (10 * multiplier)); // Local points
      if (onAddPoints) onAddPoints(10); // Global points
    } else {
      setFeedback('incorrect');
      if (onError) onError();
    }

    setTimeout(() => {
      setFeedback(null);
      generateQuestion();
    }, 400); // Faster transition for challenge
  };

  if (!isPlaying && timeLeft === 60) {
    return (
      <div className="card">
        <h2 style={{ color: 'var(--secondary)' }}>🧠 Cálculo Rápido</h2>
        <p style={{ fontSize: '1.2rem', margin: '20px 0' }}>
          Resuelve la mayor cantidad de operaciones posibles en 60 segundos. ¡Demuestra tu agilidad!
        </p>
        <div className="flex-col">
          <button className="primary" onClick={startGame}>¡Empezar Desafío!</button>
          <button className="secondary" onClick={onBack}>Volver al Menú</button>
        </div>
      </div>
    );
  }

  if (!isPlaying && timeLeft === 0) {
    return (
      <div className="card" style={{ animation: 'floatIn 0.5s ease-out' }}>
        <h2>¡Tiempo Agotado! ⏱️</h2>
        <p style={{ fontSize: '3rem', margin: '20px 0', color: 'var(--primary)' }}>
          Puntos: {score}
        </p>
        <p style={{ marginBottom: '20px', fontSize: '1.2rem' }}>
          {score > 100 ? '¡Eres una calculadora humana! 🔥' : '¡Muy buen trabajo! Sigue practicando.'}
        </p>
        <button className="primary" onClick={startGame}>Jugar de nuevo</button>
        <br/><br/>
        <button className="secondary" onClick={onBack}>Volver al Menú</button>
      </div>
    );
  }

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--secondary)' }}>
          ⏱️ {timeLeft}s
        </div>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
          ⭐ {score} pts
        </div>
      </div>
      
      {question && (
        <>
          <div style={{ fontSize: '4.5rem', fontWeight: 'bold', margin: '20px 0' }}>
            {question.num1} {question.symbol} {question.num2}
          </div>

          <div className="flex-row" style={{ marginTop: '30px', position: 'relative' }}>
            {streak >= 3 && feedback === 'correct' && (
              <div className="combo-text animation-pop" style={{ position: 'absolute', top: '-40px', color: 'var(--accent)', fontWeight: 'bold', fontSize: '1.2rem' }}>
                ¡Combo x{Math.min(Math.floor(streak / 3) + 1, 5)}!
              </div>
            )}
            {question.options.map((opt, i) => (
              <button 
                key={i} 
                className="secondary"
                style={{ width: '90px', fontSize: '1.5rem', margin: '5px' }}
                onClick={() => handleAnswer(opt)}
                disabled={feedback !== null}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Visual Feedback Line underneath */}
      <div style={{
        height: '8px', 
        width: '100%', 
        backgroundColor: feedback === 'correct' ? 'var(--success)' : feedback === 'incorrect' ? 'var(--danger)' : 'transparent',
        borderRadius: '4px',
        marginTop: '30px',
        transition: 'background-color 0.2s'
      }} />

    </div>
  );
};

export default MentalChallenge;
