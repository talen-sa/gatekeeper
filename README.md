## Dependencies

- Python3-devel or Python3-dev
- Python3 >= 3.6
- GCC

## Getting Started

Create a python virtual environment with `python3 -m venv {venv name}`

Activate the virtual environment `source ${VENV_DIR}/bin/activate`

Install poetry with pip `pip install poetry`

Install all dependencies with poetry `poetry install`

Set necessary Environment:

```
export FLASK_APP=gatekeeper
export FLASK_ENV=development
```
