from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):

    __tablename__ = "users"

    username = db.Column(db.String(30), nullable=False, primary_key=True)
    is_admin = db.Column(db.Boolean(), nullable=False, default=False)
    team = db.Column(db.String(30), db.ForeignKey("teams.team_name"))
    checked_in = db.Column(db.Boolean(), default=False)

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

    def to_json(self):
        """Returns a JSON representation of the user."""
        return {
            "username": self.username,
            "is_admin": self.is_admin,
            "team": self.team,
            "checked_in": self.checked_in,
        }


class Team(db.Model):

    __tablename__ = "teams"

    team_name = db.Column(db.String(30), nullable=False, primary_key=True)

    members = db.relationship("User", backref="team_name")

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

    @staticmethod
    def get_all():
        """Returns a list of all Team objects in the Teams table"""
        return Team.query.all()

    @staticmethod
    def get_user(teamname):
        """Returns a Team Object for a specific Team, if it exists.

        Args:
            teamname: teamname to search for
        """
        return Team.query.filter_by(teamname=teamname).first()

    def to_json(self):
        """Returns a JSON representation of the Team."""
        return {
            "teamname": self.team_name,
            "members": self.members,
            "in_office": self.is_in_office(),
        }
