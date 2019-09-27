def register_blueprints(app):
    from gatekeeper.api.users import users_bp
    from gatekeeper.api.teams import teams_bp

    app.register_blueprint(users_bp)
    app.register_blueprint(teams_bp)
