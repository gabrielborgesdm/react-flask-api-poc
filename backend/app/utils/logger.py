from logging import Logger


def get_logger() -> Logger:
    from backend.main import app

    return app.logger


def info(msg):
    get_logger().info(msg)


def error(msg):
    get_logger().error(msg)
