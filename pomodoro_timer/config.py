import os

import dotenv

dotenv.load_dotenv()

DEBUG = os.getenv("debug").lower() == "true"
ENV = os.getenv("env")
PORT = os.getenv("port")
