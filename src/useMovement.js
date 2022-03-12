import { useEffect, useState } from "react";

export default function useMovement() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [direction, setDirection] = useState('moveDown');

  
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

  return {x, y, direction, move};
}