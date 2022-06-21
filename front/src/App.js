import React from 'react';
import './App.css';
import { Metrics } from './components/MetricsSide';
import { Time } from './components/TimeSide';

function App() {
    return (
        <div className="App">
            <Time />
            <Metrics />
        </div>
    );
}

export default App;
