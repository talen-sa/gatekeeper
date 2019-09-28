from enum import Enum

from gatekeeper.config import Config

_pixels = [{}] * Config.ROW_COUNT

if Config.USE_BOARD is not None:
    import board
    import neopixel

    _pixels = neopixel.NeoPixel(board.D12, Config.ROW_COUNT)

_colors = {"red": (10, 0, 0), "green": (0, 10, 0), "blue": (0, 0, 10)}


class WhiteboardError(Exception):
    pass


class WhiteboardStatus(Enum):
    OUT = 0
    IN = 1


def set_status(position, status):
    if position >= len(_pixels):
        raise WhiteboardError(
            "position {} exceeds row count {}".format(position, len(_pixels))
        )
    if status == WhiteboardStatus.OUT.value:
        _pixels[position] = _colors["red"]
    elif status == WhiteboardStatus.IN.value:
        _pixels[position] = _colors["green"]
    else:
        _pixels[position] = _colors["blue"]


def toggle_status(status):
    for pixel in _pixels:
        set_status(_pixels[pixel], status)
