import setuptools

setuptools.setup(
    name="PomodoroTimer",
    version="1.0.0",
    entry_points={"console_scripts": ["pomo=pomodoro_timer.__main__:cli"]},
    long_description=open("README.md").read(),
    license=open("LICENSE.md").read(),
)
