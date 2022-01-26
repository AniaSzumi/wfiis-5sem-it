import imp
from operator import truediv
from flask import jsonify, request
from flask_restful import Resource
from . import db
from api import api, bcrypt, app
from flask_cors import CORS

cors = CORS(app, resources={r"/*": {"origins": "*"}})

def valid_data(data):
  if "place" in data and "date" in data and "time" in data and "temperature" in data and "description" in data:
    return True
  return False

class User(Resource):
  def put(self):
    req = request.get_json()
    conn = db.get_db()
    cur = conn.cursor()
    cur.execute("select * from users where username = ?", (req["username"],))
    res = cur.fetchone()
    db.close_db()
    if res != None:
      user = dict(res)
      if bcrypt.check_password_hash(user["password"], req["password"]):
        return 1
    return 0

  def post(self):
    req = request.get_json()
    hashed_password = bcrypt.generate_password_hash(req["password"]).decode('utf-8')
    conn = db.get_db()
    cur = conn.cursor()
    cur.execute("select * from users where username = ?", (req["username"],))
    prev = cur.fetchone()
    if prev == None:
      cur.execute("insert into users (username, password) values (?, ?)", (req["username"], hashed_password))
      conn.commit()
      db.close_db()
      return cur.lastrowid
    db.close_db()
    return 0

class Weather(Resource):
  def get(self, id):
    cur = db.get_db().cursor()
    cur.execute("select * from weather where id=:id", {"id": id})
    row = cur.fetchone()
    db.close_db()
    return jsonify(dict(row))


class WeatherList(Resource):
  def get(self):
    cur = db.get_db().cursor()
    cur.execute("select * from weather")
    rows = cur.fetchall()
    data = [dict(r) for r in rows]
    db.close_db()
    return jsonify(data)

  def post(self):
    weather = request.get_json()
    conn = db.get_db()
    cur = conn.cursor()
    cur.execute("select * from weather where place = ? and date = ? and time = ?", (weather["place"], weather["date"], weather["time"]))
    prev = cur.fetchone()
    if prev == None and valid_data(weather):
      cur.execute("insert into weather (place, date, time, temperature, description) values (?, ?, ?, ?, ?)", (weather["place"], weather["date"], weather["time"], weather["temperature"], weather["description"]))
      conn.commit()
      db.close_db()
      return cur.lastrowid
    db.close_db()
    return 0

api.add_resource(WeatherList, '/weather/')
api.add_resource(Weather, '/weather/<id>')
api.add_resource(User, '/users/')
