from flask import current_app, render_template

from pomodoro_timer import config


@current_app.route("/")
def index():
    return render_template("index.html")


@current_app.route("/settings")
def settings():
    return config.config_dict
