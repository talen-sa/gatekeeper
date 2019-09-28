from enum import Enum

from gatekeeper.config import Config

_pixels = [{}] * Config.ROW_COUNT

_leds = []

if Config.USE_BOARD is not None:
    import board
    import neopixel

    _pixels = neopixel.NeoPixel(board.D12, Config.ROW_COUNT)

_colors = {
    "red": (10, 0, 0),
    "green": (0, 10, 0),
    "blue": (0, 0, 10),
    "off": (0, 0, 0),
    "yellow": (10, 7, 0),
    "white": (10, 10, 10),
}


class WhiteboardError(Exception):
    pass


class WhiteboardStatus(Enum):
    OUT = 0
    IN = 1
    STATA = 2
    STATB = 3
    STATC = 4


def _translate_position(index):
    num_leds = len(_pixels)
    if index < num_leds / 2:
        return num_leds - (1 + index)
    else:
        return index - (num_leds // 2)


def set_status(position, status):
    if position >= len(_pixels):
        raise WhiteboardError(
            "position {} exceeds row count {}".format(position, len(_pixels))
        )
    led_position = _translate_position(position)
    if status == WhiteboardStatus.OUT.value:
        _pixels[led_position] = _colors["red"]
    elif status == WhiteboardStatus.IN.value:
        _pixels[led_position] = _colors["green"]
    elif status == WhiteboardStatus.STATA.value:
        _pixels[led_position] = _colors["blue"]
    elif status == WhiteboardStatus.STATB.value:
        _pixels[led_position] = _colors["off"]
    elif status == WhiteboardStatus.STATC.value:
        _pixels[led_position] = _colors["yellow"]
    else:
        _pixels[led_position] = _colors["white"]


def toggle_status(status):
    for i in range(len(_pixels)):
        set_status(i, status)
