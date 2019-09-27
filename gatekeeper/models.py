from flask_marshmallow import Marshmallow
from marshmallow import fields
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
ma = Marshmallow()


class User(db.Model):

    __tablename__ = "users"

    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(30), nullable=False, unique=True)
    # is_admin = db.Column(db.Boolean(), default=False)
    team_id = db.Column(db.Integer(), db.ForeignKey("teams.id"))
    checked_in = db.Column(db.Boolean(), default=False)

    # team = db.relationship("Team", backref="team")

    def save(self):
        """Addes the non-existing user to the DB."""
        db.session.add(self)
        db.session.commit()

    def delete(self):
        """Deletes the user from the DB."""
        db.session.delete(self)
        db.session.commit()

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


class UserSchema(ma.Schema):
    team_name = fields.Method("get_team_name")

    def get_team_name(self, user):
        return Team.get_team_by_id(user.id).name

    class Meta:
        fields = ("id", "username", "team_id", "team_name", "checked_in")


user_schema = UserSchema()
users_schema = UserSchema(many=True)


class Team(db.Model):

    __tablename__ = "teams"

    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(30), nullable=False, unique=True)

    def save(self):
        """Addes the non-existing Team to the DB."""
        db.session.add(self)
        db.session.commit()

    def delete(self):
        """Deletes the Team from the DB."""
        db.session.delete(self)
        db.session.commit()

    def in_office(self):
        for member in self.members:
            if member.checked_in:
                return True
        return False

    @staticmethod
    def get_all():
        """Returns a list of all Team objects in the Teams table"""
        return Team.query.all()

    @staticmethod
    def get_team_by_id(id):
        """Returns a Team Object for a specific Team, if it exists.

        Args:
            teamname: teamname to search for
        """
        return Team.query.filter_by(id=id).first()

    @staticmethod
    def get_team_by_name(name):
        """Returns a Team Object for a specific Team, if it exists.

        Args:
            teamname: teamname to search for
        """
        return Team.query.filter_by(name=name).first()


class TeamSchema(ma.ModelSchema):
    class Meta:
        model = Team


team_schema = TeamSchema()
teams_schema = TeamSchema(many=True)
