from flask import Flask
from flask_cors import CORS
from src.routes.blueprint import blueprint

def create_app():
    app = Flask(__name__)

    return app

app = create_app()
CORS(blueprint)
app.register_blueprint(blueprint)
CORS(app)

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
