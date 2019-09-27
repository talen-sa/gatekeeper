from flask import Flask, jsonify

from gatekeeper.models import db
from gatekeeper.api import register_blueprints


app = Flask(__name__)
app.config.from_object("gatekeeper.settings")

register_blueprints(app)

db.init_app(app)


@app.before_first_request
def init_forum():
    db.create_all()


@app.route("/api/status")
def healthcheck():
    return jsonify({"Status": "Online"})
