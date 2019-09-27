from flask import Blueprint
from flask_restful import Api, Resource


class TeamApi(Resource):
    def get(self, team_name):
        pass

    def put(self, team_name):
        pass

    def delete(self, team_name):
        pass


class TeamsApi(Resource):
    def get(self):
        pass

    def post(self):
        pass

    def delete(self):
        pass


teams_bp = Blueprint("teams", __name__)

api = Api(teams_bp)

api.add_resource(TeamsApi, "/api/teams/")
api.add_resource(TeamApi, "/api/teams/<string:team_name>")
