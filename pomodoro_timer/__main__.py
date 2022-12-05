import webbrowser

import click

from pomodoro_timer import config, create_app


@click.group()
def cli():
    pass


@cli.command()
@click.option("--switch", "-s", is_flag=True)
def run(switch: bool):
    app = create_app(config)
    if switch:
        webbrowser.open(f"http://localhost:{config.PORT}")
    app.run()
