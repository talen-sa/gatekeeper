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
