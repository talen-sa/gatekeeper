from flask import Blueprint
from flask_restful import Api, Resource

from gatekeeper.api.response import Fail, Success
from gatekeeper.models import User


class UserApi(Resource):
    def get(self, username):
        user = User.get_user(username)
        if not user:
            return Fail(f"User with username {username} not found").to_json(), 404
        return Success({"user": user.to_json()}).to_json(), 200

    def put(self, username):
        pass

    def delete(self, username):
        pass


class UsersApi(Resource):
    def get(self):
        pass

    def post(self):
        pass

    def delete(self):
        pass


users_bp = Blueprint("users", __name__)

api = Api(users_bp)

api.add_resource(UsersApi, "/api/users/")
api.add_resource(UserApi, "/api/users/<string:username>")
