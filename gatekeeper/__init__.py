from flask import Flask, jsonify

from gatekeeper.api import register_blueprints
from gatekeeper.models import db

app = Flask(__name__)
app.config.from_object("gatekeeper.settings")

register_blueprints(app)

db.init_app(app)


@app.before_first_request
def init_forum():
    db.create_all()


@app.route("/status")
def healthcheck():
    return jsonify({"Status": "Online"})
