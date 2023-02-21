import setuptools

setuptools.setup(
    name="PomodoroTimer",
    version="2.0.0",
    entry_points={"console_scripts": ["pomodoro=pomodoro.__main__:cli"]},
    long_description=open("README.md").read(),
    license=open("LICENSE.md").read(),
)
