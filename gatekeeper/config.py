import os


class Config(object):
    ENV = os.getenv("FLASK_ENV", "development")
    DEBUG = True

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    SQLALCHEMY_DATABASE_URI = "postgresql://{}:{}@{}:{}/{}".format(
        os.getenv("API_DB_USERNAME", "admin"),
        os.getenv("API_DB_PASSWORD", "pass"),
        os.getenv("API_DB_HOST", "localhost"),
        os.getenv("API_DB_PORT", "5432"),
        os.getenv("API_DB_NAME", "gate_db"),
    )

    BOARD_RANGE = os.getenv("BOARD_RANGE", 10)
    USE_BOARD = os.getenv("USE_BOARD", None)
    ROW_COUNT = os.getenv(int("ROW_COUNT"), 10)
