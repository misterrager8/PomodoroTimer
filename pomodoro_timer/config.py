import os

import dotenv

dotenv.load_dotenv()

PORT = os.getenv("port")

pomodoro_default = int(os.getenv("pomodoro_default")) * 60 * 1000
long_break_default = int(os.getenv("long_break_default")) * 60 * 1000
short_break_default = int(os.getenv("short_break_default")) * 60 * 1000

config_dict = dict(
    PORT=PORT,
    pomodoro_default=pomodoro_default,
    long_break_default=long_break_default,
    short_break_default=short_break_default,
)
