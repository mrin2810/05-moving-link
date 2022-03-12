import React, { useEffect, useRef, useState } from 'react';
import './App.css';

export default function App() {

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [direction, setDirection] = useState('moveDown');
  const canvasRef = useRef(null);
  const linkUpRef = useRef(null);
  const linkLeftRef = useRef(null);
  const linkDownRef = useRef(null);
  const linkRightRef = useRef(null);

  function move(direction) {
    setDirection(direction);
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
    let linkRef;
    switch(direction) {
      case 'moveUp': 
        linkRef = linkUpRef;
        break;
      case 'moveRight': 
        linkRef = linkRightRef;
        break;
      case 'moveLeft': 
        linkRef = linkLeftRef;
        break;
      case 'moveDown': 
        linkRef = linkDownRef;
        break;
      default: break;
    }
    context.drawImage(linkRef.current, x, y);
  }, [x, y, direction]);

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
        <img src="https://i.imgur.com/JYUB0m3.png" alt="Down" ref={linkDownRef} />
        <img src="https://i.imgur.com/GEXD7bk.gif" alt="Right" ref={linkRightRef} />
        <img src="https://i.imgur.com/XSA2Oom.gif" alt="Up" ref={linkUpRef} />
        <img src="https://i.imgur.com/4LGAZ8t.gif" alt="Left" ref={linkLeftRef} />
      </div>
    </div>
  );
}
