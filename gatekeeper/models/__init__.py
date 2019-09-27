from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
ma = Marshmallow()


def init_db():
    from gatekeeper.models.team import Team

    # from gatekeeper.models.belong_to import BelongsTo
    from gatekeeper.models.user import User

    db.create_all()
