from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
from api import db
from flask_bcrypt import Bcrypt

app = Flask(__name__, static_folder='../build', static_url_path='/')
api = Api(app)
app.config["DATABASE"] = "weather.sqlite"
db.init_app(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
bcrypt = Bcrypt(app)

@app.route('/')
def index():
    return app.send_static_file('index.html')

from api import routes
