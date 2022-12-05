$(document).ready(function() {
    localStorage.getItem('PomodoroTimer') === 'dark' ? setDark() : setLight();
    renderTimer();
});

function setDark() {
    localStorage.setItem('PomodoroTimer', 'dark');
    document.documentElement.setAttribute('data-theme', localStorage.getItem('PomodoroTimer'));
    $('#dark').show();
    $('#light').hide();
}

function setLight() {
    localStorage.setItem('PomodoroTimer', 'light');
    document.documentElement.setAttribute('data-theme', localStorage.getItem('PomodoroTimer'));
    $('#light').show();
    $('#dark').hide();
}

const timer = () => `
<div class="text-center">
    <div>
        <a class="btn text-secondary active" onclick="renderTimer()">Pomodoro</a>
        <a class="btn text-secondary" onclick="shortBreak(event)">Short Break</a>
        <a class="btn text-secondary" onclick="longBreak(event)">Long Break</a>
    </div>
    <p style="font-size: 5em" id="remaining">25:00</p>
    <a id="start" onclick="startTimer()" class="btn btn-lg text-secondary">START</a>
    <a id="pause" style="display: none" onclick="pauseTimer()" class="btn btn-lg text-secondary">PAUSE</a>
</div>
<input id="remainingInt" type="hidden" value="${25 * 60 * 1000}">
<audio id="alarm"><source src="static/alarm.mp3" type="audio/mpeg"></source></audio>
`;

var paused = false;
var theTimer;

function renderTimer() {
    stopTimer();
    $('#index').html(timer());
    document.title = '25:00';
}

function shortBreak(event) {
    stopTimer();
    $('.active').removeClass('active');
    event.currentTarget.classList.add('active');
    $('#remaining').text('5:00');
    document.title = '5:00';
    $('#remainingInt').val(5 * 60 * 1000);
}

function longBreak(event) {
    stopTimer();
    $('.active').removeClass('active');
    event.currentTarget.classList.add('active');
    $('#remaining').text('15:00');
    document.title = '15:00';
    $('#remainingInt').val(15 * 60 * 1000);
}

function formatTime(num) {
    minutes = Math.floor((num % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((num % (1000 * 60)) / 1000);
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    paused = false;
    $('#start').hide();
    $('#pause').show();

    theTimer = setInterval(function() {
        var remaining = parseInt($('#remainingInt').val());
        if (!paused && remaining != 0) {
            remaining -= 1000;
            $('#remaining').text(formatTime(remaining));
            $('#remainingInt').val(remaining);
            document.title = formatTime(remaining);
        } else if (remaining == 0) { ringAlarm(); }
    }, 1000);
}

function pauseTimer() {
    paused = true;
    $('#start').show();
    $('#pause').hide();
}

function ringAlarm() {
    var alarm = document.getElementById("alarm");
    alarm.play();
}

function stopTimer() {
    paused = true;
    $('#start').show();
    $('#pause').hide();
    clearInterval(theTimer);
}
