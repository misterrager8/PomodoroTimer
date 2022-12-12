import webbrowser

import click

from pomodoro_timer import config, create_app


@click.group()
def cli():
    pass


@cli.command()
@click.option("--debug", "-d", is_flag=True)
def run(debug: bool):
    app = create_app(config)
    if not debug:
        webbrowser.open(f"http://localhost:{config.PORT}/")
    app.config["ENV"] = "development" if debug else "production"
    app.run(port=config.PORT, debug=debug)
