from flask import Blueprint, request
from flask_restful import Api, Resource
from marshmallow import ValidationError

from gatekeeper.controllers.response import Error, Fail, Success
from gatekeeper.models import Team, User, user_schema, users_schema


class UserApi(Resource):
    def get(self, username):
        user = User.get_user(username)
        if user is None:
            return Fail(f"User with username {username} not found").to_json(), 404
        result = user_schema.dumps(user).data
        return {"data": result}, 200

    def put(self, username):
        pass

    def delete(self, username):
        user = User.get_user(username)
        if user is None:
            return Fail(f"User with username {username} not found").to_json(), 404
        user.delete()
        return None, 204


class UsersApi(Resource):
    def get(self):
        users = User.get_all()
        users_json = users_schema.dump(users)
        return Success(users_json).to_json(), 200

    def post(self):
        try:
            data = user_schema.load(request.get_json())
            teamname = data["team_id"]
            username = data["username"]
            team = Team.get_team(teamname)
            if team is None:
                return Fail(f"Team {teamname} does not exist").to_json(), 400
            user = User.get_user(username)
            if user is None:
                new_user = User(username=username, team_id=team.id)
                new_user.save()
                return Success(f"user {username} created successfully").to_json(), 201
            return Fail(f"User {username} already exists").to_json()
        except ValidationError as err:
            return Error(str(err)).to_json(), 400


users_bp = Blueprint("users", __name__)

api = Api(users_bp)

api.add_resource(UsersApi, "/api/users/")
api.add_resource(UserApi, "/api/users/<string:username>")
