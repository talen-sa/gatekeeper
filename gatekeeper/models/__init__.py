from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
ma = Marshmallow()

base = db.make_declarative_base(model=db.Model)

belongs_to = db.Table(
    "belongs_to",
    base.metadata,
    db.Column("user", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("team", db.String, db.ForeignKey("teams.name"), primary_key=True),
    extend_existing=True,
)


class Team(base):

    __tablename__ = "teams"

    name = db.Column(db.String(30), primary_key=True, nullable=False)
    in_office = db.Column(db.Boolean(), default=False)
    location = db.Column(db.String(30), default="vault")
    board_position = db.Column(db.Integer(), unique=True)

    def save(self):
        """Addes the non-existing Team to the DB."""
        db.session.add(self)
        db.session.commit()

    def delete(self):
        """Deletes the Team from the DB."""
        db.session.delete(self)
        db.session.commit()

    def is_in_office(self):
        for member in self.members:
            if member.checked_in:
                return True
        return False

    def set_board_position(self, position):
        old = Team.get_at_board_position(position)
        if old is not None:
            old.board_position = None
            old.save()
        self.board_position = position
        self.save()

    @staticmethod
    def get_all():
        """Returns a list of all Team objects in the Teams table"""
        return Team.query.all()

    @staticmethod
    def get_team(name):
        """Returns a Team Object for a specific Team, if it exists.

        Args:
            teamname: teamname to search for
        """
        return Team.query.filter_by(name=name).first()

    @staticmethod
    def get_at_board_position(position):
        return Team.query.filter_by(board_position=position)


class TeamSchema(ma.Schema):
    class Meta:
        fields = ("name", "in_office", "location", "board_position")


team_schema = TeamSchema()
teams_schema = TeamSchema(many=True)


class User(base):
    __tablename__ = "users"

    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(30), nullable=False, unique=True)
    teams = db.relationship("Team", secondary="belongs_to", backref="_users")

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


class UserSchema(ma.ModelSchema):
    class Meta:
        model = User


user_schema = UserSchema()
users_schema = UserSchema(many=True)
