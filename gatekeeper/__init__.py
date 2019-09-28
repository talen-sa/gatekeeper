from flask import Flask, jsonify

from gatekeeper.config import Config
from gatekeeper.controllers import register_blueprints
from gatekeeper.models import base, db, ma
from gatekeeper.whiteboard import toggle_status

app = Flask(__name__)

app.config.from_object(Config)

register_blueprints(app)

db.init_app(app)
ma.init_app(app)


@app.before_first_request
def init_forum():
    base.metadata.create_all(bind=db.engine)

    toggle_status(1)
    toggle_status(0)


@app.route("/status")
def healthcheck():
    return jsonify({"Status": "Online"})
