from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
ma = Marshmallow()

base = db.make_declarative_base(model=db.Model)
