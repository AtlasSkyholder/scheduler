import { useState } from "react";

export default function useVisualMode(initial) {  // changes/updates history of mode
  const [mode, setMode] = useState(initial);
  const [history] = useState([initial]);

  function transition(mode, replace = false) {
    if (replace === true) {
      history.push(initial);
    } 
    history.push(mode);
    setMode(mode);
  }

  function back() {
    if (mode !== initial) {
      history.pop();
      setMode(history[history.length - 1]);
    }
  }

  return { mode, transition, back };
};