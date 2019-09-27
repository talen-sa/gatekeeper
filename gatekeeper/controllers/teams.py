from flask import Blueprint, request
from flask_restful import Api, Resource
from marshmallow import ValidationError

from gatekeeper.controllers.response import Error, Fail, Success
from gatekeeper.models.team import Team, team_schema, teams_schema


class TeamApi(Resource):
    def get(self, team_name):
        pass

    def put(self, team_name):
        pass

    def delete(self, team_name):
        pass


class TeamsApi(Resource):
    def get(self):
        teams = Team.get_all()
        response = teams_schema.dump(teams)
        return Success(response).to_json(), 200

    def post(self):
        try:
            data = team_schema.load(request.get_json())
            team = Team.get_team_by_name(str(data.name))
            if team is None:
                team = Team(name=data.name)
                team.save()
                return Success(f"Team {data.name} created").to_json(), 204
            return Fail(f"Team {data.name} already exists").to_json(), 400
        except ValidationError as err:
            return Error(str(err)).to_json(), 400

    def delete(self):
        pass


teams_bp = Blueprint("teams", __name__)

api = Api(teams_bp)

api.add_resource(TeamsApi, "/api/teams/")
api.add_resource(TeamApi, "/api/teams/<string:team_name>")
