from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy, declarative_base

db = SQLAlchemy()
ma = Marshmallow()

Base = declarative_base(cls=db.Model)


def init_db():
    from gatekeeper.models.user import User
    from gatekeeper.models.team import Team

    Base.metadata.create_all(bind=db.engine)
