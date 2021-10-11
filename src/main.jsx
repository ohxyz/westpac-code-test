import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Game from './Game';
import { Dealer } from './dealer';
import './assets/css/snap.css';

function App() {
  const [shouldRender, setShouldRender] = useState(true);

  function handleStart() {
    setShouldRender(false);
    setTimeout(() => {
      setShouldRender(true);
    }, 1000);
  }

  return shouldRender ? (
    <Game dealer={new Dealer()} onStartClick={handleStart} />
  ) : (
    <em>Restarting...</em>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
