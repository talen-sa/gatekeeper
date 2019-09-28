from marshmallow import ValidationError, fields

from gatekeeper.models import base, db, ma


class Team(base):

    __tablename__ = "teams"

    name = db.Column(db.String(30), primary_key=True, nullable=False)
    status = db.Column(db.Integer(), default=2)
    location = db.Column(db.String(30), default="vault")
    board_position = db.Column(db.Integer(), unique=True)
    _members = db.relationship("User", secondary="belongs_to")

    def save(self):
        """Addes the non-existing Team to the DB."""
        db.session.add(self)
        db.session.commit()

    def delete(self):
        """Deletes the Team from the DB."""
        self._members.clear()
        db.session.delete(self)
        db.session.commit()

    def set_board_position(self, position):
        old = Team.get_at_board_position(position)
        if old is not None:
            raise ValidationError(
                f"Board poistion {position} already taken by {old.name}"
            )
        self.board_position = position
        self.save()

    def to_json(self):
        """Returns a JSON representation of the team."""
        return {
            "name": self.name,
            "status": self.status,
            "location": self.location,
            "board_position": self.board_position,
        }

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
        team = Team.query.filter_by(name=name).first()
        if team is None:
            raise ValidationError(f"Team {name} does not exist.")
        return team

    @staticmethod
    def get_team_at_position(position):
        return Team.query.filter_by(board_position=position).first()

    @staticmethod
    def validate_non_existance(name):
        team = Team.query.filter_by(name=name).first()
        if team is not None:
            raise ValidationError(f"Team {name} already exists.")

    @staticmethod
    def is_team_at_board_position(position):
        team = Team.query.filter_by(board_position=position).first()
        if team is not None:
            raise ValidationError(f"Team already exists at boar_position {position}")


class TeamSchema(ma.Schema):
    members = fields.Method("get_members")

    def get_members(self, team):
        return [member.to_json() for member in team._members]

    class Meta:
        fields = ("name", "status", "location", "board_position", "members")


class TeamsSchema(ma.Schema):
    class Meta:
        fields = ("name", "status", "location", "board_position")


class PostTeamSchema(ma.Schema):
    class Meta:
        fields = ("name", "location", "board_position")


class TeamPutSchema(ma.Schema):
    location = fields.String(required=True)


class TeamPatchSchema(ma.Schema):
    class Meta:
        fields = ("status", "board_position")


team_schema = TeamSchema()

post_team_schema = PostTeamSchema()

teams_schema = TeamsSchema(many=True)

team_put_schema = TeamPutSchema()
team_patch_schema = TeamPatchSchema()
