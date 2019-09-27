from gatekeeper.models import db, ma, Base

# from gatekeeper.models.user import belongs_to


class Team(Base):

    __tablename__ = "teams"

    name = db.Column(db.String(30), primary_key=True, nullable=False)
    in_office = db.Column(db.Boolean(), default=False)
    location = db.Column(db.String(30), default="vault")
    board_position = db.Column(db.Integer(), unique=True)
    # members = db.relationship(
    #     "users", secondary=belongs_to, backref=db.backref("_teams")
    # )

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
