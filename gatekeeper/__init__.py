from flask import Flask, jsonify

from gatekeeper.controllers import register_blueprints
from gatekeeper.config import Config
from gatekeeper.models import db, ma, init_db

app = Flask(__name__)

app.config.from_object(Config)

register_blueprints(app)

db.init_app(app)
ma.init_app(app)


@app.before_first_request
def init_forum():
    init_db()


@app.route("/status")
def healthcheck():
    return jsonify({"Status": "Online"})
