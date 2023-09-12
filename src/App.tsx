import { MouseEvent, useState } from "react";
import "./App.css";

type Dot = {
  x: number;
  y: number;
};

function App() {
  const [dots, setDots] = useState<Dot[]>([]);
  const [cache, setCache] = useState<Dot[]>([]);

  const handleMarker = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    setDots([...dots, { x: clientX, y: clientY }]);
    console.log(dots);
  };

  const undo = () => {
    if (dots.length > 0) {
      const newDots = [...dots];
      const lastDot = newDots.pop() as Dot;
      Promise.all([setDots(newDots), setCache([...cache, lastDot])]);
    }
  };

  const redo = () => {
    if (cache.length > 0) {
      const newCache = [...cache];
      const lastCacheItem = newCache.pop() as Dot;
      Promise.all([setCache(newCache), setDots([...dots, lastCacheItem])]);
    }
  };

  return (
    <div className="App">
      <div className="button-wrapper">
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
      </div>
      <div className="dot-area" onClick={handleMarker}>
        {dots.map(({ x, y }: Dot, i: number) => (
          <div
            key={`dot-${i}`}
            className="dot"
            style={{ left: x, top: y }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default App;
