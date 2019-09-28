from flask import Blueprint, current_app, request
from flask_restful import Api, Resource
from marshmallow import ValidationError

from gatekeeper.controllers.response import Error, Fail, Success
from gatekeeper.models.team import Team
from gatekeeper.models.user import (User, user_patch_schema, user_put_schema,
                                    user_schema, users_post_schema,
                                    users_schema)


class UserApi(Resource):
    def get(self, username):
        user = User.get_user(username)
        if user is None:
            return Fail(f"User with username {username} not found").to_json(), 404
        result = user_schema.dump(user)
        return Success(result).to_json(), 200

    def patch(self, username):
        try:
            user = User.get_user(username)
            if user is None:
                return Fail(f"User with username {username} not found").to_json(), 404
            teams = user_patch_schema.load(request.get_json())["teams"]
            current_app.logger.debug(teams)
            for t in teams:
                team_name = t["name"]
                team = Team.get_team(team_name)
                if team is None:
                    return Fail(f"Team {team_name} does not exist").to_json(), 400
                user._teams.append(team)
            user.save()
            return None, 204
        except ValidationError as err:
            return Error(str(err)).to_json(), 400

    def put(self, username):
        try:
            user = User.get_user(username)
            if user is None:
                return Fail(f"User with username {username} not found").to_json(), 404
            user._teams = []
            teams = user_put_schema.load(request.get_json())["teams"]
            current_app.logger.debug(teams)
            for t in teams:
                team_name = t["name"]
                team = Team.get_team(team_name)
                if team is None:
                    return Fail(f"Team {team_name} does not exist").to_json(), 400
                user._teams.append(team)
            user.save()
            return None, 204
        except ValidationError as err:
            return Error(str(err)).to_json(), 400

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
            data = users_post_schema.load(request.get_json())
            username = data["username"]
            user = User.get_user(username)
            if user is not None:
                return Fail(f"User {username} already exists").to_json()
            new_user = User(username=username)

            teams = data.get("teams")
            if teams is not None and len(teams) > 0:
                for t in teams:
                    team_name = t["name"]
                    team = Team.get_team(team_name)
                    if team is None:
                        return Fail(f"Team {team_name} does not exist").to_json(), 400
                    new_user._teams.append(team)
            new_user.save()
            return Success(f"user {username} created successfully").to_json(), 201
        except ValidationError as err:
            return Error(str(err)).to_json(), 400


users_bp = Blueprint("users", __name__)

api = Api(users_bp)

api.add_resource(UsersApi, "/api/users/")
api.add_resource(UserApi, "/api/users/<string:username>")
