from flask import Flask
import comments

app = Flask(__name__)


@app.route("/")
def home():
    return "Hello, Flask!"
