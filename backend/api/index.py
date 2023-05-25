from datetime import datetime
from flask import Flask
import comment_tools

app = Flask(__name__)


@app.route("/")
def home():
    return "Hello, Flask!"


@app.route("/sentiments/<video_id>")
def sentiments(video_id):
    video_id = str(video_id)
    sentiments = comment_tools.check_if_analyzed(video_id)
    if len(sentiments.data) > 0:
        year_analyzed = int(sentiments.data[0]["created_at"][0:4])
        year_now = int(datetime.now().year)
        if year_now - year_analyzed == 0:
            return sentiments.data[0]["sentiments"]
    comments = comment_tools.get_video_comments(video_id)
    sentiments = comment_tools.analyze_comments(comments)
    comment_tools.add_to_analyzed(video_id, sentiments)
    return sentiments


if __name__ == "__main__":
    app.run(debug=True)
