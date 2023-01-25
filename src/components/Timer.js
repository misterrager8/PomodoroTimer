import { useState, useEffect } from 'react';
import audio from './alarm.mp3';

var x; 

function Timer() {
	const [running, setRunning] = useState(false);
	const [length, setLength] = useState(25*60*1000);


	const formatTime = (num) => {
	    let minutes = Math.floor((num % (1000 * 60 * 60)) / (1000 * 60));
	    let seconds = Math.floor((num % (1000 * 60)) / 1000);
	    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
	};

	useEffect(() => {
		document.getElementById('rem').textContent = formatTime(length);
		document.title = formatTime(length);
		if (length == 0) {
			let alarm = document.getElementById('alarm');
			alarm.play();
			clearInterval(x);
			setRunning(false);
		}
	}, [length]);

	const startTimer = () => {
		setRunning(true);
		setLength(25*60*1000);
		x = setInterval(function() {
			setLength(length => length - 1000);
		}, 1000);
	};

	const stopTimer = () => {
		setRunning(false);
		setLength(25*60*1000);
		clearInterval(x);
	};

	return (
		<div className="text-center">
			<div id="rem" style={{ fontSize: '10em' }}></div>
			<div className="btn-group btn-group-lg text-uppercase">
			{!running ? (
				<a onClick={startTimer} className="btn btn-outline-success">Start</a>
				) : (
				<span className="btn-group btn-group-lg">
					<a className="btn btn-outline-primary">Pause</a>
					<a onClick={stopTimer} className="btn btn-outline-danger">Stop</a>
				</span>
				)}
			</div>
			<audio id="alarm"><source src={audio} type="audio/mp3"></source></audio>
		</div>
		);
}

export default Timer;