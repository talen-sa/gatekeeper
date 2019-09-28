from flask import Blueprint
from flask_restful import Api, Resource


class BoardAPI(Resource):
    def get(self):
        boards = []
        return Success()


boards_bp = Blueprint("board", __name__)

api = Api(boards_bp)

api.add_resource(BoardAPI, "/api/board/")
