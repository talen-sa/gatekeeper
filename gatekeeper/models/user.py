from marshmallow import fields

from gatekeeper.models import base, db, ma

belongs_to = db.Table(
    "belongs_to",
    base.metadata,
    db.Column("user", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("team", db.String, db.ForeignKey("teams.name"), primary_key=True),
    extend_existing=True,
)


class User(base):
    __tablename__ = "users"

    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(30), nullable=False, unique=True)
    _teams = db.relationship(
        "Team", secondary="belongs_to", backref="_users", cascade="delete"
    )

    def save(self):
        """Addes the non-existing user to the DB."""
        db.session.add(self)
        db.session.commit()

    def delete(self):
        """Deletes the user from the DB."""
        db.session.delete(self)
        db.session.commit()

    def to_json(self):
        """Returns a JSON representation of the user."""
        return {"id": self.id, "username": self.username}

    @staticmethod
    def get_all():
        """Returns a list of all User objects in the Users table"""
        return User.query.all()

    @staticmethod
    def get_user(username):
        """Returns a user Object for a specific user, if it exists.

        Args:
            username: username to search for
        """
        return User.query.filter_by(username=username).first()


class UserTeamSchema(ma.Schema):
    name = fields.String(required=True)


class UserSchema(ma.Schema):
    teams = fields.Method("get_teams")

    def get_teams(self, user):
        return [team.to_json() for team in user._teams]

    class Meta:
        fields = ("id", "username", "teams")


class UserPutSchema(ma.Schema):
    teams = fields.List(fields.Nested(UserTeamSchema))


class UsersPostSchema(ma.Schema):
    username = fields.String(required=True)
    teams = fields.List(fields.Nested(UserTeamSchema))


class UserPatchSchema(ma.Schema):
    teams = fields.List(fields.Nested(UserTeamSchema))


user_schema = UserSchema()
users_schema = UserSchema(many=True)
users_post_schema = UsersPostSchema()
user_put_schema = UserPutSchema()
user_patch_schema = UserPatchSchema()
