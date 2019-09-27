import time
import board
import neopixel

_pixels = neopixel.NeoPixel(board.D12, 1)

_colors = {
    'red': (10, 0, 0),
    'green': (0, 10, 0),
    'blue': (0, 0, 10)
}

class WhiteboardError(Exception):
    pass

def set_status(position, status):
    if position > len(_pixels):
        raise WhiteboardError("position {} exceeds row count {}", position, len(_pixels))
    _pixels[position] = _colors['red'] if status == 0 else _colors['green']
