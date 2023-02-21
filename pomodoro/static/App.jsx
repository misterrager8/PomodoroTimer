function App() {
    const [sessionLength, setSessionLength] = React.useState(25);
    const [shortBreakLength, setShortBreakLength] = React.useState(5);
    const [longBreakLength, setLongBreakLength] = React.useState(15);

    const [currentLength, setCurrentLength] = React.useState(sessionLength*60*1000);

    const [timer, setTimer] = React.useState([]);

    const [running, setRunning] = React.useState(false);

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

    React.useEffect(() => {
        if (currentLength == 0) {
            stopTimer();
            let alarm = document.getElementById('alarm');
            alarm.play();
            setTimeout(function() {
                alarm.pause();
                alarm.currentTime = 0;
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
            <audio id="alarm"><source src="static/alarm.mp3" type="audio/mp3"></source></audio>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
