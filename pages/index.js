"use client";
import { useState } from "react";

export default function Home() {
  const [names, setNames] = useState("");
  const [runners, setRunners] = useState([]);
  const [positions, setPositions] = useState([]);
  const [winner, setWinner] = useState(null);
  const [raceOn, setRaceOn] = useState(false);

  const startRace = () => {
    const list = names.split(",").map(n => n.trim()).filter(Boolean);
    setRunners(list);
    setPositions(list.map(() => 0));
    setWinner(null);
    setRaceOn(true);

    let pos = list.map(() => 0);

    const interval = setInterval(() => {
      pos = pos.map(p => p + Math.random() * 10);
      setPositions([...pos]);

      const max = Math.max(...pos);
      if (max >= 100) {
        const winIndex = pos.indexOf(max);
        setWinner(list[winIndex]);
        setRaceOn(false);
        clearInterval(interval);
      }
    }, 200);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🏃 Running Race Game</h1>

      <input
        type="text"
        placeholder="Enter names (comma separated)"
        value={names}
        onChange={(e) => setNames(e.target.value)}
        style={{ width: "100%", padding: 10 }}
      />

      <button onClick={startRace} style={{ marginTop: 10 }}>
        Start Race
      </button>

      <div style={{ marginTop: 30 }}>
        {runners.map((name, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <strong>{name}</strong>
            <div
              style={{
                height: 10,
                width: positions[i] + "%",
                background: "blue",
                transition: "width 0.2s"
              }}
            />
          </div>
        ))}
      </div>

      {winner && (
        <h2 style={{ marginTop: 20 }}>
          🏆 Winner: {winner}
        </h2>
      )}
    </div>
  );
}
