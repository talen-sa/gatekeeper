from flask import Blueprint, request
from flask_restful import Api, Resource
from marshmallow import ValidationError

import gatekeeper.whiteboard as whiteboard
from gatekeeper.controllers.response import Error, Fail, Success
from gatekeeper.models.team import (Team, post_team_schema, team_patch_schema,
                                    team_put_schema, team_schema, teams_schema)
from gatekeeper.models.user import User


class TeamApi(Resource):
    def get(self, team_name):
        try:
            team = Team.get_team(team_name)
            result = team_schema.dump(team)
            return Success(result).to_json(), 200
        except ValidationError as err:
            return Error(str(err)).to_json(), 400

    def put(self, team_name):
        try:
            team = Team.get_team(team_name)
            data = team_put_schema.load(request.get_json())
            board_position = data["board_position"]
            Team.is_team_at_board_position(board_position)
            for k, v in data.items():
                setattr(team, k, v)
            team.save()
            return None, 204
        except ValidationError as err:
            return Error(str(err)).to_json(), 400

    def patch(self, team_name):
        try:
            team = Team.get_team(team_name)
            status = team_patch_schema.load(request.get_json())["status"]

            # validate status enum
            team.status = status

            if team.board_position is not None:
                whiteboard.set_status(team.board_position, status)
            team.save()
            return None, 204
        except ValidationError as err:
            return Error(str(err)).to_json(), 400
        except whiteboard.WhiteboardError as err:
            return Error(str(err)).to_json(), 400

    def delete(self, team_name):
        try:
            team = Team.get_team(team_name)
            team.delete()
            return None, 204
        except ValidationError as err:
            return Error(str(err)).to_json(), 400


class TeamsApi(Resource):
    def get(self):
        teams = Team.get_all()
        response = teams_schema.dump(teams)
        return Success(response).to_json(), 200

    def post(self):
        try:
            data = post_team_schema.load(request.get_json())
            Team.validate_non_existance(data["name"])
            team = Team()
            for k, v in data.items():
                setattr(team, k, v)
            team.save()
            return Success(f"Team {team.name} created").to_json(), 204
        except ValidationError as err:
            return Error(str(err)).to_json(), 400


class TeamAndUser(Resource):
    def delete(self, team_name, user_name):
        try:
            team = Team.get_team(team_name)
            user = User.get_user(user_name)
            team._members.remove(user)
            team.save()
            return None, 204
        except ValueError:
            return (
                Fail(f"User: {user_name} not found on Team: {team_name}").to_json(),
                404,
            )
        except ValidationError as err:
            return Error(str(err)).to_json(), 400


teams_bp = Blueprint("teams", __name__)

api = Api(teams_bp)

api.add_resource(TeamsApi, "/api/teams/")
api.add_resource(TeamApi, "/api/teams/<string:team_name>")
api.add_resource(TeamAndUser, "/api/teams/<string:team_name>/<string:user_name>")
