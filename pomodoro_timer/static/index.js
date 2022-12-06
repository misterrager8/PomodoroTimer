$(document).ready(function() {
    localStorage.getItem('PomodoroTimer') === 'dark' ? setDark() : setLight();
    getSettings();
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

var paused = false;
var theTimer;
var settings;
getSettings();

const timer = () => `
<div class="text-center">
    <div>
        <a class="btn text-secondary active" onclick="renderTimer()">Pomodoro</a>
        <a class="btn text-secondary" onclick="shortBreak(event)">Short Break</a>
        <a class="btn text-secondary" onclick="longBreak(event)">Long Break</a>
    </div>
    <p style="font-size: 5em" id="remaining">${formatTime(settings['pomodoro_default'])}</p>
    <a id="start" onclick="startTimer()" class="btn btn-lg text-secondary">START</a>
    <a id="pause" style="display: none" onclick="pauseTimer()" class="btn btn-lg text-secondary">PAUSE</a>
</div>
<input id="remainingInt" type="hidden" value="${settings['pomodoro_default']}">
<audio id="alarm"><source src="static/alarm.mp3" type="audio/mpeg"></source></audio>
`;

function renderTimer() {
    stopTimer();
    $('#index').html(timer());
    document.title = formatTime(settings['pomodoro_default']);
}

function shortBreak(event) {
    stopTimer();
    $('.active').removeClass('active');
    event.currentTarget.classList.add('active');
    $('#remaining').text(formatTime(settings['short_break_default']));
    document.title = formatTime(settings['short_break_default']);
    $('#remainingInt').val(settings['short_break_default']);
}

function longBreak(event) {
    stopTimer();
    $('.active').removeClass('active');
    event.currentTarget.classList.add('active');
    $('#remaining').text(formatTime(settings['long_break_default']));
    document.title = formatTime(settings['long_break_default']);
    $('#remainingInt').val(settings['long_break_default']);
}

function formatTime(num) {
    minutes = Math.floor((num % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((num % (1000 * 60)) / 1000);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
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

function getSettings() {
    $.get('settings', function(data) {
        settings = data;
    });
}

function renderSettings() {
    $('#index').html('<a onclick="renderTimer()" class="btn btn-sm text-secondary"><i class="bi bi-arrow-left"></i> Back</a>');
    for (x in settings) {
        $('#index').append(`
            <div class="form-floating mb-1">
                <input value=${settings[x]} autocomplete="off" class="form-control border-0" name="${x}">
                <label for="${settings[x]}">${x}</label>
            </div>
            `);
    }
}
