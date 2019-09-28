from flask import Blueprint, request
from flask_restful import Api, Resource
from marshmallow import ValidationError

from gatekeeper.controllers.response import Error, Fail, Success
from gatekeeper.models.team import (
    Team,
    post_team_schema,
    team_patch_schema,
    team_put_schema,
    team_schema,
    teams_schema,
)

import gatekeeper.whiteboard as whiteboard


class TeamApi(Resource):
    def get(self, team_name):
        team = Team.get_team(team_name)
        if team is None:
            return Error(f"Team {team_name} does not exist.").to_json(), 404
        result = team_schema.dump(team)
        return Success(result).to_json(), 200

    def put(self, team_name):
        team = Team.get_team(team_name)
        if team is None:
            return Error(f"Team {team_name} does not exist.").to_json(), 404
        try:
            data = team_put_schema.load(request.get_json())
            board_position = data["board_position"]
            if Team.is_team_at_board_position(board_position):
                return (
                    Fail(
                        f"Team already exists at board_position {board_position}"
                    ).to_json(),
                    400,
                )
            for k, v in data.items():
                setattr(team, k, v)
            team.save()
            return None, 204
        except ValidationError as err:
            return Error(str(err)).to_json(), 400

    def patch(self, team_name):
        try:
            team = Team.get_team(team_name)
            if team is None:
                return Error(f"Team {team_name} does not exist.").to_json(), 404
            status = team_patch_schema.load(request.get_json())["status"]
            # validate status enum

            team.status = status

            # Update board
            whiteboard.set_status(team.board_position, status)
            team.save()
            return None, 204
        except ValidationError as err:
            return Error(str(err)).to_json(), 400

    def delete(self, team_name):
        team = Team.get_team(team_name)
        if team is None:
            return Fail(f"Team {team_name} does not exist.").to_json(), 404
        team.delete()
        return None, 204


class TeamsApi(Resource):
    def get(self):
        teams = Team.get_all()
        response = teams_schema.dump(teams)
        return Success(response).to_json(), 200

    def post(self):
        try:
            data = post_team_schema.load(request.get_json())
            team = Team.get_team(data["name"])
            if team is not None:
                return Fail(f"Team {team.name} already exists").to_json(), 400

            team = Team()
            for k, v in data.items():
                setattr(team, k, v)
            team.save()
            return Success(f"Team {team.name} created").to_json(), 204
        except ValidationError as err:
            return Error(str(err)).to_json(), 400


teams_bp = Blueprint("teams", __name__)

api = Api(teams_bp)

api.add_resource(TeamsApi, "/api/teams/")
api.add_resource(TeamApi, "/api/teams/<string:team_name>")
