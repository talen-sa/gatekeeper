from flask import Flask, jsonify

from gatekeeper.config import Config
from gatekeeper.controllers import register_blueprints
from gatekeeper.models import base, db, ma
from gatekeeper.models.team import Team
from gatekeeper.whiteboard import set_status, toggle_status

app = Flask(__name__)

app.config.from_object(Config)

register_blueprints(app)

db.init_app(app)
ma.init_app(app)


@app.before_first_request
def init_forum():
    toggle_status(2)

    for i in range(Config.ROW_COUNT):
        team = Team.get_team_at_position(i)
        if team is not None:
            set_status(i, team.status)
    base.metadata.create_all(bind=db.engine)


@app.route("/status")
def healthcheck():
    return jsonify({"Status": "Online"})
