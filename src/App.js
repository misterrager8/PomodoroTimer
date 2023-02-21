import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import $ from 'jquery';

import audio from './alarm.mp3';


import {useState, useEffect} from 'react';

function App() {
    const [sessionLength, setSessionLength] = useState(.1);
    const [shortBreakLength, setShortBreakLength] = useState(5);
    const [longBreakLength, setLongBreakLength] = useState(15);

    const [currentLength, setCurrentLength] = useState(sessionLength*60*1000);

    const [timer, setTimer] = useState([]);

    const [running, setRunning] = useState(false);

    const startTimer = () => {
        setRunning(true);
        setTimer(setInterval(function() {
            setCurrentLength(currentLength => currentLength - 1000);
        }, 1000));
    }

    const pauseTimer = () => {
        setRunning(false);
        clearInterval(timer);
    }

    const stopTimer = () => {
        setRunning(false);
        clearInterval(timer);
        setCurrentLength(sessionLength*60*1000);
    }

    const formatTime = (num) => {
        let minutes = Math.floor((num % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((num % (1000 * 60)) / 1000);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    useEffect(() => {
        if (currentLength == 0) {
            stopTimer();
            let alarm = document.getElementById('alarm');
            alarm.play();
            setTimeout(function() {
                alarm.currentTime = 0;
                alarm.pause();
            }, 7500);
        }
    }, [currentLength]);

    return (
        <div className="text-center p-5">
            <div className="btn-group btn-group-lg mb-3">
                <a onClick={() => setCurrentLength(sessionLength*60*1000)} className="btn btn-outline-secondary">Pomodoro</a>
                <a onClick={() => setCurrentLength(shortBreakLength*60*1000)} className="btn btn-outline-secondary">Short Break</a>
                <a onClick={() => setCurrentLength(longBreakLength*60*1000)} className="btn btn-outline-secondary">Long Break</a>
            </div>
            <p className="heading fw-bold mb-3" style={{ fontSize:'10em' }}>{formatTime(currentLength)}</p>
            <div className="btn-group btn-group-lg mb-3 text-uppercase">
                {!running && <a onClick={() => startTimer()} className="btn btn-outline-success">Start</a>}
                {running && <a onClick={() => pauseTimer()} className="btn btn-outline-primary">Pause</a>}
                {running && <a onClick={() => stopTimer()} className="btn btn-outline-danger">Stop</a>}
            </div>
            <audio id="alarm"><source src={audio} type="audio/mp3"></source></audio>
        </div>
    );
}

export default App;
