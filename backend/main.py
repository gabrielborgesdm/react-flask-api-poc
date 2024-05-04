from flask import Flask
from config import Config
from app.controllers import blueprint

app = Flask(__name__)
app.config.from_object(Config)
app.register_blueprint(blueprint)

if __name__ == "__main__":
    app.run(debug=True)
