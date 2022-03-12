import React, { useEffect, useRef, useState } from 'react';
import './App.css';

export default function App() {

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const canvasRef = useRef(null);
  
  function move(direction) {
    if (direction === "moveUp") {
      setY((y) => y - 10);
    }
    if (direction === "moveLeft") {
      setX((x) => x - 10);
    }
    if (direction === "moveDown") {    
      setY((y) => y + 10);
    }
    if (direction === "moveRight") {
      setX((x) => x + 10);
    }
  }
  
  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
  }, []);

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillRect(x, y, 100, 100);
    console.log(window.innerHeight, window.innerWidth);
    console.log(x, y);
  }, [x, y]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    function handleKeyDown(e) {
      if (e.key === "ArrowUp") {
        move('moveUp');
      }
      if (e.key === "ArrowLeft") {
        move('moveLeft');
      }
      if (e.key === "ArrowDown") {
        move('moveDown');
      }
      if (e.key === "ArrowRight") {
        move('moveRight');
      }
    }

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
  
  return (
    <div className="app">
      <canvas ref={canvasRef} />

      <div className="arrows">
        <button onClick={() => move('moveUp')}>Up</button>
        <button onClick={() => move('moveLeft')}>Left</button>
        <button onClick={() => move('moveDown')}>Down</button>
        <button onClick={() => move('moveRight')}>Right</button>
      </div>

      <div className="images">
        <img src="https://i.imgur.com/JYUB0m3.png" alt="Down" />
        <img src="https://i.imgur.com/GEXD7bk.gif" alt="Right" />
        <img src="https://i.imgur.com/XSA2Oom.gif" alt="Up" />
        <img src="https://i.imgur.com/4LGAZ8t.gif" alt="Left" />
      </div>
    </div>
  );
}
