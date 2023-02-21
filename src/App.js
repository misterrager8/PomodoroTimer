import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import $ from 'jquery';

import audio from './alarm.mp3';


import {useState, useEffect} from 'react';

function App() {
    const [theme, setTheme] = useState(localStorage.getItem('Pomodoro'));
    const [sessionLength, setSessionLength] = useState(!localStorage.getItem('session-length') ? 24 : localStorage.getItem('session-length'));
    const [shortBreakLength, setShortBreakLength] = useState(!localStorage.getItem('short-break-length') ? 5 : localStorage.getItem('short-break-length'));
    const [longBreakLength, setLongBreakLength] = useState(!localStorage.getItem('long-break-length') ? 15 : localStorage.getItem('long-break-length'));

    const [currentLength, setCurrentLength] = useState(sessionLength*60*1000);

    const [timer, setTimer] = useState([]);

    const [running, setRunning] = useState(false);

    const changeTheme = (theme_) => {
        localStorage.setItem('Pomodoro', theme_);
        document.documentElement.setAttribute('data-theme', theme_);
        setTheme(theme_);
    }

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

    const changeSettings = (e) => {
        e.preventDefault();

        localStorage.setItem('session-length', $('#session-length').val());
        localStorage.setItem('short-break-length', $('#short-break-length').val());
        localStorage.setItem('long-break-length', $('#long-break-length').val());

        setSessionLength($('#session-length').val());
        setShortBreakLength($('#short-break-length').val());
        setLongBreakLength($('#long-break-length').val());
    }

    const formatTime = (num) => {
        let minutes = Math.floor((num % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((num % (1000 * 60)) / 1000);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    useEffect(() => {
        document.title = formatTime(currentLength);
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

    useEffect(() => {
        changeTheme(theme);
    }, []);

    return (
        <div className="p-5">
            <div className="d-flex justify-content-between pb-5">
                <div className="btn-group btn-group-sm">
                    <a data-bs-target="#settings" data-bs-toggle="modal" className="btn btn-outline-secondary"><i className="bi bi-gear"></i> Settings</a>
                    <a data-bs-target="#themes" data-bs-toggle="dropdown" className="btn btn-outline-secondary dropdown-toggle text-capitalize"><i className="bi bi-paint-bucket"></i> {theme}</a>
                    <div id="themes" className="dropdown-menu text-center">
                        {theme !== 'light' && <a onClick={() => changeTheme('light')} className="small dropdown-item text-capitalize">light</a>}
                        {theme !== 'dark' && <a onClick={() => changeTheme('dark')} className="small dropdown-item text-capitalize">dark</a>}
                        {theme !== 'charcoal' && <a onClick={() => changeTheme('charcoal')} className="small dropdown-item text-capitalize">charcoal</a>}
                        {theme !== 'pine' && <a onClick={() => changeTheme('pine')} className="small dropdown-item text-capitalize">pine</a>}
                        {theme !== 'maroon' && <a onClick={() => changeTheme('maroon')} className="small dropdown-item text-capitalize">maroon</a>}
                        {theme !== 'deepspace' && <a onClick={() => changeTheme('deepspace')} className="small dropdown-item text-capitalize">deepspace</a>}
                    </div>
                </div>
            </div>
            <div className="text-center">
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
            <div className="modal" id="settings">
                <div className="modal-dialog">
                    <div className="modal-content p-4">
                        <form onSubmit={(e) => changeSettings(e)}>
                            <input id="session-length" autoComplete="off" defaultValue={sessionLength} className="form-control" type="number"/>
                            <input id="short-break-length" autoComplete="off" defaultValue={shortBreakLength} className="form-control" type="number"/>
                            <input id="long-break-length" autoComplete="off" defaultValue={longBreakLength} className="form-control" type="number"/>
                            <button type="submit" className="btn btn-outline-secondary">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
